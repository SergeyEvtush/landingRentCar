"use strict"
//бургер
const iconMenu=document.querySelector('.menu__icon');
const menuBody=document.querySelector('.menu__body');
if(iconMenu)
{

	//при клике на menu__icon то есть на бургер(на саму иконку) присваиваем body класс _lock,а для иконки и для самого меню
	//добавляем им класс _active
iconMenu.addEventListener("click",function(e){
	document.body.classList.toggle('_lock');	
iconMenu.classList.toggle('_active');
menuBody.classList.toggle('_active');
});
}
//прокрутка при клике
const menuLinks=document.querySelectorAll('.link__to[data-goto]');//ищем только те элементы классов menu__link у котрых есть атрибут data-goto
if(menuLinks.length>0)
{
menuLinks.forEach(menuLink=>{
menuLink.addEventListener("click",onMenuLinkClick)
});
function onMenuLinkClick(e)
	{
const menuLink=e.target;
//проверка на то  что есть ли чтото в датат атрибуте и  существует ли объект на который ссылается данный атрибут  
if(menuLink.dataset.goto&&document.querySelector(menuLink.dataset.goto))
			{
	//получаем сам объект на который	 ссылается дата атрибут
const gotoBlock = document.querySelector(menuLink.dataset.goto);
//вычисляем положение объекта с учетом высоты шапки
const gotoBlockValue=/*местоположение объекта от верха в пикселях*/gotoBlock.getBoundingClientRect().top+/*количество прокрученных пикселей*/pageYOffset-/*высота шапки*/document.querySelector('header').offsetHeight;
/*проверка нужна для того чтобы при открытом меню при прокрутке к нужному разделу меню закрывалось */
if(iconMenu.classList.contains('_active'))
{
	/*убираем классы которые добавили при открытии меню */
	document.body.classList.remove('_lock');	
iconMenu.classList.remove('_active');
menuBody.classList.remove('_active');

}

/*код который прокручивает скролл на высоту равную константе  gotoBlockValue*/
window.scrollTo
	({
top:gotoBlockValue,
behavior:"smooth"/* плавность поркрутки*/
		});
e.preventDefault();//отключаем работу ссылки
			}
		}
	}