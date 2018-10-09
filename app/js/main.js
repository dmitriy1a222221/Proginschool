
class Slider {
    constructor(wrapSlide1 , wrapSlide2, slide1, slide2, btnPrev, btnNext, dishes) {
        this.btnPrev = (btnPrev) ? document.querySelector(`${btnPrev}`) : undefined;
        this.btnNext = (btnNext) ? document.querySelector(`${btnNext}`) : undefined;
        this.wrapSlide1 = (wrapSlide1) ? document.querySelector(`${wrapSlide1}`) : undefined;
        this.wrapSlide2 = (wrapSlide2) ? document.querySelector(`${wrapSlide2}`) : undefined;
        this.slide1 = (slide1) ? document.querySelectorAll(`${slide1}`) : undefined;
        this.slide2 = (slide2) ? document.querySelectorAll(`${slide2}`) : undefined;
        this.dishes = (dishes) ? document.querySelectorAll(`${dishes}`) : undefined;
        this.wrapSlide1Width = (this.slide1) ? this.slide1.length * 100 : undefined;
        this.wrapSlide2Width = (this.slide2) ? this.slide2.length * 100 : undefined;
        this.slide1Width = (this.slide1) ? 100 / this.slide1.length : undefined;
        this.slide2Width = (this.slide2) ? 100 / this.slide2.length : undefined;
        this.arrPush = [];

        (this.wrapSlide1) ? this.wrapSlide1.style.width = `${this.wrapSlide1Width}%` : undefined;
        (this.wrapSlide2) ? this.wrapSlide2.style.width = `${this.wrapSlide2Width}%` : undefined;
        (this.slide1) ? this.slide1.forEach(item => {
            item.style.width = `${this.slide1Width}%`;
        }) : undefined;
        (this.slide2) ? this.slide2.forEach(item => {
            item.style.width = `${this.slide2Width}%`;
        }) : undefined;

        for(let i = 0; i <= 100; i += this.slide1Width) {
            this.arrPush.push(i)
        }
    }

    logicSlider() {
        let arrPosition = [...this.arrPush],
            counter = 0,
            delNull = arrPosition.pop();

        let set = (pos) => {
            (this.wrapSlide1) ? this.wrapSlide1.style.transform = `translateX(-${pos}%)` : undefined;
            (this.wrapSlide2) ? this.wrapSlide2.style.transform = `translateX(-${pos}%)` : undefined;
        };
        let init = () => {
            set(arrPosition[counter]);
        };
        let prev = () => {
            counter--;
            if(counter < 0 ) counter = arrPosition.length-1;
            set(arrPosition[counter]);
            this.dishes.forEach(item => {
                item.classList.remove('active')
            });
            this.dishes[counter].classList.add('active')
        };
        let next = () => {
            counter++;
            if(counter === arrPosition.length) counter = 0;
            set(arrPosition[counter]);
            this.dishes.forEach(item => {
                item.classList.remove('active')
            });
            this.dishes[counter].classList.add('active')
        };

        let dishesNav = () => {
            for(let i = 0; i < this.dishes.length; i++) {
                this.dishes[i].addEventListener('click', (e) => {
                    counter = i;
                    set(arrPosition[counter]);
                    this.dishes.forEach(el => {
                        el.classList.remove('active');
                    });
                    this.dishes[i].classList.add('active');
                });
            }
        };

        if(this.dishes){
            dishesNav();
        }
        if (this.btnPrev || this.btnNext){
            this.btnPrev.addEventListener('click', prev);
            this.btnNext.addEventListener('click', next);
        }

        return init();
    }

}

class ValidateForm {
    constructor(form, formElement) {
        this.form = (form) ? document.querySelector(`${form}`) : undefined;
        this.formElement = (formElement) ? this.form.querySelectorAll(`${formElement}`) : undefined;
        this.types = {
            'name': /^[_a-zA-Z0-9а-яА-ЯёЁ ]+$/,
            'subject': /.+/,
            'email': /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
            'text': /.+/
        };

    }
    validateLogic() {
        this.formElement.forEach(item => {
            item.addEventListener('focus', focus = () => {
                item.style.cssText = 'border: 2px solid #1957cf';
                let regEx;
                function valid() {
                    if(!(regEx.test(item.value))){
                        item.style.cssText = 'border: 2px solid #8b3238';
                    } else {
                        item.style.cssText = 'border: 2px solid #1957cf';
                    }
                }
                switch (item.dataset.id){
                    case 'name':
                        regEx = this.types.name;
                        item.addEventListener('input', valid);
                        break;
                    case 'subject':
                        regEx = this.types.subject;
                        item.addEventListener('input', valid);
                        break;
                    case 'email':
                        regEx = this.types.email;
                        item.addEventListener('input', valid);
                        break;
                    case 'message':
                        regEx = this.types.text;
                        item.addEventListener('input', valid);
                        break;
                }

            });
            item.addEventListener('blur', function refocus() {
                //let spanFocus = item.nextSibling.nextSibling;
                if(item.value !== ''){
                    item.style.cssText = 'border: 2px solid transparent';
                } else {
                    item.style.cssText = 'border: 2px solid transparent';
                }
            })
        })
    }
}

let btnUpLogic = () => {
  let btnUp = document.querySelector('.btn-up');
};

class DropDownMenu {
    constructor(nameNav, dropNav) {
        this.name = document.querySelector(`${nameNav}`);
        this.dropNav = document.querySelector(`${dropNav}`);
        this.triangle = document.querySelector('.triangle');
    }

    dropDown() {
        let flag = false;
        // let showForMouseover = () => {
        //         this.dropNav.style.cssText = 'visibility: visible;  transform: translateY(0px); opacity: 1';
        //         this.triangle.style.cssText = 'transform: rotate(180deg)';
        //         return
        // };
        // let hiddenForMouseout = () => {
        //         this.dropNav.style.cssText = 'visibility: hidden; transform: translateY(30px);  opacity: 0';
        //         this.triangle.style.cssText = 'transform: rotate(0deg)';
        //         return
        // };
        // this.name.addEventListener('mouseover', () => {
        //     showForMouseover();
        // });
        // //this.name.removeEventListener('mouseout', showForMouseover);
        // this.name.addEventListener('mouseout', () => {
        //     hiddenForMouseout();
        // });

        let showBlock = () => {
            this.dropNav.style.cssText = 'visibility: visible;  transform: translateY(0px); opacity: 1';
            this.triangle.style.cssText = 'transform: rotate(180deg)';
            return
        };

        let hiddenBlock = () => {
            this.dropNav.style.cssText = 'visibility: hidden; transform: translateY(30px);  opacity: 0';
            this.triangle.style.cssText = 'transform: rotate(0deg)';
            return
        };

        let showMenu = () => {
            if(!flag) {
                showBlock();
                flag = !flag;
                console.log(flag)
            } else {
                document.addEventListener('click', () => {
                    hiddenBlock();

                    return
                }, false);
                flag = !flag;
                console.log(flag)
            }
        };
        this.name.addEventListener('click', showMenu);

    }
}

let dropDownMenu = new DropDownMenu('.nav-menu', '.nav-menu-list');
dropDownMenu.dropDown();



document.addEventListener('DOMContentLoaded', () => {
    let slider1 = new Slider('.aboutUs__slides', '.aboutUs__slides-wrap', '.aboutUs__slides-img', '.aboutUs__slide', '.aboutUs__arrow_prev','.aboutUs__arrow_next', '.aboutUs-swich' );
    slider1.logicSlider();

    let slider2 = new Slider('.blog__wrap-slides', '', '.blog__slide', '', '.blog__prev-arrow','.blog__next-arrow', '' );
    slider2.logicSlider();

    let validateForm = new ValidateForm('.form', '[data-id]');
    validateForm.validateLogic();

    btnUpLogic();
});
