"use strict"
//бургер
const iconMenu=document.querySelector('.menu__icon');
const menuBody=document.querySelector('.menu__body');
const popupActive1=document.querySelectorAll('.popup.open');
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
	const animItems=document.querySelectorAll('._anim-items');//класс объектов которые будут анимироваться
	if(animItems.length>0)
	{
		window.addEventListener('scroll',animOnScroll);//слушаем событи скролл,когда он происходит запускаем метод animOnScroll
	function animOnScroll(params)
	{
	for(let i=0;i<animItems.length;i++){
		const animItem=animItems[i];
		const animItemHeight=animItem.offsetHeight;
		const animItemOffset = offset(animItem).top;//с пом функции(см ниже) растояние от верха экрана до объекта 
	
		const animStart=4;//коэффициент регулирующий момент старта анимации
		//расчет точки начала анимации
	let animItemPoint=window.innerHeight-animItemHeight/animStart;//высота окна браузера минус высота объекта поделенную на коэффициент регулирующий момент начала старта анимации
	//если объект по высоте больше чем высота окна браузера то расчет точки начала анимации будет считаться по формуле ниже
	if(animItemHeight>window.innerHeight)
	{
		animItemPoint=window.innerHeight-window.innerHeight/animStart;
	}
	//если пркручено больше чем позиция объекта минус точка старта и меньше чем позиция объекта минус его высота
	if((pageYOffset>animItemOffset-animItemPoint)&&pageYOffset<(animItemOffset+animItemHeight))
	{
		animItem.classList.add('_activeScroll');
	}else{
		animItem.classList.remove('_activeScroll');
	}
				}
	
	}
	//функция вычисляющая растояние от верха экрана до начала объекта
	//или гот правой части экрана до объекта
	function offset(el){
	const rect = el.getBoundingClientRect(),
	scrollLeft=window.pageXOffset||document.documentElement.scrollLeft,
	scrollTop=window.pageYOffset||document.documentElement.scrollTop;
	return{top:rect.top+scrollTop,left:rect.left+screenLeft}
			}
			//метод задержки анимации
			setTimeout(()=>{
					//вызываю метод "изначально" для того чтобы анимация была сразу при загрузке окна
			animOnScroll();
			},300);
		
	}
	"use strict"
const titleCards=document.querySelectorAll('.column__header-offert');
const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll(".lock-padding");
const HeaderVar=document.querySelector('.header');
const Radio = document.querySelector('.form__buster__yes');
let labelbuster=document.querySelector('.buster__label');
let unlock = true;
const timeout = 800;
console.log(titleCards.length);
if(popupLinks.length>0)
{
	
for(let index=0;index<popupLinks.length;index++)
{
	const popupLink=popupLinks[index];
	const titleCard=titleCards[index];//получаю объект в котором написана марка автомобиля
	
	popupLink.addEventListener("click",function(e){
	
		
	const popupName = popupLink.getAttribute('href').replace('#','');//здесь мы берем ссылку на которую кликаем и из атрибута href  убирае решетку и заменяем на имя по id
	const curentPopup=document.getElementById(popupName);
	let  titleCardValue=titleCard.innerText;//получаю текст который написан в том объекте кнопку которого мы слушаем
	document.getElementById("carBrand").value=titleCardValue;//записываем  полученный текст в инпут который находится в попапе в форме
	popupOpen(curentPopup);//щткрываем попап
	HeaderVar.classList.add('novisible');//присваиваем классу header класс novisible для того чтобы при получении этого класса его убрать при открытии попапа
	e.preventDefault();//с пом этой функции запрещаем перезагружать страницу 
}
	);}
	
}



//метод для объектов закрывающих попап
const popupCloseIcon = document.querySelectorAll('.close-popup');
if(popupCloseIcon.length>0)
{
	for(let index=0;index<popupCloseIcon.length;index++)
	{
const el=popupCloseIcon[index];
el.addEventListener(
	'click',function(e){
		document.getElementById("form-contact").reset();
		popupClose(el.closest('.popup'));
		HeaderVar.classList.remove('novisible');
		e.preventDefault();
	}
);}
}
function popupOpen(curentPopup){
if(curentPopup && unlock)
{
const popupActive=document.querySelector('.popup.open');

if(popupActive){
	
popupClose(popupActive,false);

}
else{
bodyLock();

}
curentPopup.classList.add('open');
curentPopup.addEventListener("click",function(e){
if(!e.target.closest('.popup__content')){
	popupClose(e.target.closest('.popup'));
			}
		});
	}
	return true;
}
function popupClose(popupActive,doUnlock = true){
if(unlock){
popupActive.classList.remove('open');
if(doUnlock){
bodyUnLock();
HeaderVar.classList.remove('novisible');
}
}
}

function bodyLock(){
const lockPaddingValue=window.innerWidth-document.querySelector('.wraper').offsetWidth+'px';
if(lockPadding.length>0){
	for(let index=0;index<lockPadding.length;index++){
		const el=lockPadding[index];
		el.style.paddingRight=lockPaddingValue;
		}
}

body.style.paddingRight=lockPaddingValue;
body.classList.add('lock');

unlock=false;
setTimeout(function(){
unlock=true;

},timeout);
}
function bodyUnLock(){
setTimeout(function(){
	if(lockPadding.length>0){
		for(let index=0;index<lockPadding.length;index++){
			const el = lockPadding[index];
			el.style.paddingRight = '0px';
			}
	}

body.style.paddingRight='0px';
body.classList.remove('lock');

},timeout);
unlock=false;
setTimeout(function(){
	unlock=true;
},timeout);
}
document.addEventListener('keydown',function(e){
if(e.which===27){
const popupActive=document.querySelector('.popup.open');
popupClose(popupActive);
}
})
function addClassToLabel(){
	labelbuster.classList.toggle('choise');

}
