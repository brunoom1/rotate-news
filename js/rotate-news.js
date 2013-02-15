/**
 * @author: Gabriel Bruno de Oliveira Mendonça
 * @version: 1.0
 */ 

(function($){
	$.fn.rotateNews = function(settings){
		var config = {
			'view_id':'news-view',
			'image_description':'news-image-description',
			'autoplay': true,
			'speed': 1000,
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

		var view = $('#' + config.view_id);
		var image_description = $('#' + config.image_description);

		if(!view[0]) alert('Crie uma div com o id "'+config.view_id+'"');

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

			console.log(images);

			$(this).bind('click','',function(evt){

				for(var x = 0; x < images.length; x++){
					if(images[x] != img){
						$(images[x]).hide();
					}
				}

				$(img).show();
				// se a div description for adicionada
				if(image_description[0]){
					image_description.text(img.attributes['alt'].value);
				}

				$('.' + config.classSelected).removeClass();

				$(this).addClass(config.classSelected);
			});

			$(this).bind('mouseover','',function(){
				this.click();
			});
		});

		var d = 0;

		if(config.autoplay){
			var timeId = setInterval(function(){

				if(elements.length > 0){
					elements[d++].click();
				}

				if(d == elements.length){
					d = 0;
				}
			},config.speed);
		}
	}


})(jQuery);