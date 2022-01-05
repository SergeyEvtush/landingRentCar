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