jQuery(document).ready(function ($) {


  const shareButton = document.querySelector('.share'),
            thisUrl = window.location.href,
            thisTitle = document.title;

  const copyShareUrl = async () => {
    if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      try {
        await navigator.clipboard.writeText(thisUrl);
        return;
      } catch (_error) {
        // Fall through to the legacy copy command when clipboard permission is denied.
      }
    }

    const textarea = document.createElement('textarea');
    textarea.value = thisUrl;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    const copied = document.execCommand('copy');
    textarea.remove();
    if (!copied) throw new Error('Unable to copy the share URL');
  };

  if (shareButton) {
    shareButton.addEventListener('click', async event => {
      event.preventDefault();
      try {
        if (typeof navigator.share === 'function') {
          try {
            await navigator.share({
              title: thisTitle,
              url: thisUrl
            });
            return;
          } catch (error) {
            if (error && error.name === 'AbortError') return;
          }
        }
        await copyShareUrl();
      } catch (error) {
        console.error(error);
      }
    });
  }


  $(".contacts .title__top").click(function () {
    $(this).parent().parent().find(".contacts__block").toggleClass("open");
    $(".contacts__more-btn").toggleClass("rotate");
  });
  $(".review__text").click(function () {
    $(this).toggleClass("webkit");
  });
  $(".complain__btn").click(function () {
    var $this = $(this);
    $(this).parent().parent().parent().parent().parent().find(".thanks-review").css("display", "block");
    $(this).parent().removeClass("open");
     setTimeout(function() { 
      $this.parent().parent().parent().parent().parent().find(".thanks-review").css("display", "none");
    }, 3000);
  });
  $(".review__more-open a").click(function () {
    var $this = $(this);
    $(this).parent().parent().parent().parent().parent().parent().find(".thanks-review").css("display", "block");
    $(this).parent().removeClass("open");
     setTimeout(function() { 
      $this.parent().parent().parent().parent().parent().parent().find(".thanks-review").css("display", "none");
    }, 3000);
  });
  $(".review__true-false a").click(function () {
    var $this = $(this);
    $(this).parent().parent().parent().parent().parent().find(".thanks-review").css("display", "block");
    $(this).addClass("click");
     setTimeout(function() { 
      $this.parent().parent().parent().parent().parent().find(".thanks-review").css("display", "none");
      $this.removeClass("click");
    }, 3000);
  });

  $(".program-cancel").click(function () {
    prgrm_can();
  });

  $(".header-more").click(function () {
    $(this).parent().find(".complain").addClass("open");
  });
  $(".review__more").click(function () {
    $(this).parent().find(".review__more-open").addClass("open");
  });
  jQuery(function($){
    $(document).mouseup(function (e){ // событие клика по веб-документу
      var div = $(".complain"); // тут указываем ID элемента
      if (!div.is(e.target) // если клик был не по нашему блоку
          && div.has(e.target).length === 0) { // и не по его дочерним элементам
         $(".complain").removeClass("open");
      }
    });
  });
  jQuery(function($){
    $(document).mouseup(function (e){ // событие клика по веб-документу
      var div = $(".review__more-open"); // тут указываем ID элемента
      if (!div.is(e.target) // если клик был не по нашему блоку
          && div.has(e.target).length === 0) { // и не по его дочерним элементам
         $(".review__more-open").removeClass("open");
      }
    });
  });
});
