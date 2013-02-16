/**
 * @author: Gabriel Bruno de Oliveira Mendonça
 * @version: 1.0
 */ 

(function($){
	$.fn.rotateNews = function(settings){
		var config = {
			'viewId':'news-view',
			'imageDescriptionId':'news-image-description',
			'autoplay': true,
			'speed': 3000,
			'classSelected':'selected'
		};

		if(settings){
			$.extend(config , settings);
		}

		var elements = [];
		var images = [];

		// procurar os elementos de lista
		var i = 0; // conta as notícias
		var n = 0; // conta as imagens

		var view = $('#' + config.viewId);
		var image_description = $('#' + config.imageDescriptionId);

		var lastImg = null;
		var efect = 'simple';
		var timerId = null;

		if(!view[0]) alert('Crie uma div com o id "'+config.viewId+'"');

		$(this).find('li').each(function(){

			elements[i++] = this;

			var imgs = this.getElementsByTagName('img');
			var img = null;

			if(imgs){
				img = imgs[0];
				images[n++] = img
				$(img).css({'display':'none'})
			}

			view[0].appendChild(img);
			lastImg = img;


			$(this).bind('click','',function(evt){

				// efeito a ser usado quando o mouse passa sobre
				if(efect == 'simple'){
					for(var x = 0; x < images.length; x++){
						if(images[x] != img){
							$(images[x]).hide();
						}
					}
					$(img).show();
				}
				else{
					if(lastImg) $(lastImg).fadeOut(800, function(){
						$(img).fadeIn();						
					});
				}
						
				// se a div description for adicionada
				if(image_description[0]){
					image_description.text(img.attributes['alt'].value);
				}

				$('.' + config.classSelected).removeClass();

				$(this).addClass(config.classSelected);
				lastImg = img;
			});

			$(this).bind('mouseover','',function(){
				efect = "simple";
				clearInterval(timerId);
				this.click();
			});
			$(this).bind('mouseout','',function(){
				timerId = setInterval(anim,config.speed);
			})
		});

		var d = 0;

		if(config.autoplay){
			timerId = setInterval(anim,config.speed);
		}

		function anim(){

			if(elements.length > 0){
				efect = 'null'
				elements[d++].click();
			}

			if(d == elements.length){
				d = 0;
			}
		}

		if(elements.length > 0){
			elements[0].click();
		}
	}


})(jQuery);