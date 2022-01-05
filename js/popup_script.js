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
