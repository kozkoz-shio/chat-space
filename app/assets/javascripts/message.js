$(function(){
  
      function buildHTML(message){
        if ( message.image ) {
          var html =
          `<div class="message">
            <div class="message__upper-info">
              <div class="upper-info__talker">
                ${message.user_name}
              </div>
              <div class="message__upper-info__date">
                ${message.created_at}
              </div>
            </div>
            <div class="message__text">
              <p class="message__text__content">
                ${message.content}
              </p>
            </div>
            <img src=${message.image} >
          </div>`
          return html;
        } else {
          var html =
          `<div class="message">
            <div class="message__upper-info">
              <div class="upper-info__talker">
                ${message.user_name}
              </div>
              <div class="message__upper-info__date">
                ${message.created_at}
              </div>
            </div>
            <div class="message__text">
              <p class="message__text__content">
                ${message.content}
              </p>
            </div>
          </div>`
        return html;
      };
    }

    var reloadMessages = function() {
      var last_message_id = $('.message:last').data("message-id");
      $.ajax({
        url: "api/messages",
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        console.log('success');
      })
      .fail(function() {
        alert('自動更新に失敗しました');
      });
    };


  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    
    .done(function(data){
      var html = buildHTML(data);
      $('.message-list').append(html);
      $('.message-list').animate({scrollTop: $('.message-list')[0].scrollHeight}, 'fast');    
      $('form')[0].reset();
      $('.form__submit').prop('disabled', false);
    })
    
    .fail(function(){
      alert('メッセージ送信に失敗しました');
      $('.form__submit').prop('disabled', false);
    });
  });
});
