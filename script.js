const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),    //this is the element where you want to use locomotive
    smooth: true
});

//function for the nav bar animation
function heroPageAni() {
    var tl = gsap.timeline();
    tl.from(".nav", {
        y: -10,
        opacity: 0,
        duration: 1.5,
        ease: "expo.inOut"
    });
    //for full  hero animation
    tl.to(".bounding .boundingelem", {
        y: "0%",        //Move from 100% (in CSS) to 0% (visible position)
        duration: 1.5,
        delay: -1,
        ease: "expo.inOut",
        stagger: 0.2     // animate one after another for smooth effect
    });

    tl.from(".hero-footer", {
        y: -10,
        opacity: 0,
        duration: 1.5,
        delay: -1,
        ease: "expo.inOut"
    });
}



//function for the circle shape 
const circle = document.querySelector(".rotate-circle");
var timeout;
function circleadjust() {
    //define default scale value
    var xscale = 1;
    var yscale = 1;

    var xprevious = 0;
    var yprevious = 0;

    window.addEventListener("mousemove", function (e) {
        this.clearTimeout(timeout);    //this will clear the time out each time mouse moved
        xscale = gsap.utils.clamp(.8, 1.2, e.clientX - xprevious);
        yscale = gsap.utils.clamp(.8, 1.2, e.clientY - yprevious);

        xprevious = e.clientX;
        yprevious = e.clientY;

        // console.log(xdiff, ydiff);
        circleMouseFollower(xscale, yscale);
        timeout = setTimeout(() => {
            circle.style.transform = `translate(${e.clientX}px, ${e.clientY}px) scale(1,1)`;
        }, 100);

    })
}

//function for cursor mousemove 
function circleMouseFollower(xscale, yscale) {
    // Mouse move → follow cursor
    window.addEventListener("mousemove", function (e) {
        circle.style.transform = `translate(${e.clientX}px, ${e.clientY}px) scale(${xscale},${yscale})`;
    });
}

circleadjust();
circleMouseFollower();
// heroPageAni();

let element = document.querySelectorAll(".second-subhead")
element.forEach(function (element) {
    element.addEventListener("mousemove", function (e) {
        var diffy = e.clientY - element.getBoundingClientRect().top;
        //    var diffx = e.clientX - element.getBoundingClientRect().left;


        gsap.to(element.querySelector("img"), {
            opacity: 1,
            ease: Power1.out,
            top: diffy,
            left: e.clientX,
        });

    });
});
