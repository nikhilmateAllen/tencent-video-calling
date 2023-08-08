/* global $ setBtnClickFuc genTestUserSig */
// preset before starting RTC
class Presetting {
  init() {
    // populate userId/roomId
    $('#userId').val('user_' + parseInt(Math.random() * 100000000));
    $('#roomId').val(parseInt(Math.random() * 100000));
    const roomId = this.query('roomId');
    const userId = this.query('userId');
    if (roomId) {
      $('#roomId').val(roomId);
    }
    if (userId) {
      $('#userId').val(userId);
    }

    $('#main-video-btns').hide();
    $('.mask').hide();
    setBtnClickFuc();
    
    var urlParams = new URL(location.href).searchParams;
    let appid = urlParams.get("appid");
    let secret = urlParams.get("token");
    console.log('infooo', appid, secret)
    if (appid && secret) {
      $("#appid").val(appid);
      $("#secret").val(secret);
    }
  }

  query(name) {
    const match = window.location.search.match(new RegExp('(\\?|&)' + name + '=([^&]*)(&|$)'));
    return !match ? '' : decodeURIComponent(match[2]);
  }

  login(share, callback) {
    let userId = $('#userId').val();
    let appid = $('#appid').val(),secret = $('#secret').val();
    if (share) {
      userId = 'share_' + userId;
    }
    const config = genTestUserSig(userId, appid ? parseInt(appid) : 0, secret);
    const sdkAppId = config.sdkAppId;
    const userSig = config.userSig;
    const roomId = $('#roomId').val();

    callback({
      sdkAppId,
      userId,
      userSig,
      roomId
    });
  }
}
