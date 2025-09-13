const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),    //this is the element where you want to use locomotive
    smooth: true
});

//function for the navbar and hero animation
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



//function for the circle shape change
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

//function for cursor circle mousemove 
function circleMouseFollower(xscale, yscale) {
    // Mouse move → follow cursor
    window.addEventListener("mousemove", function (e) {
        circle.style.transform = `translate(${e.clientX}px, ${e.clientY}px) scale(${xscale},${yscale})`;
    });
}

circleadjust();
circleMouseFollower();
heroPageAni();

document.querySelectorAll(".second-subhead").forEach(function (element) {
    //variable for the rotation
    var rotate = 0;
    var diffrotate = 0;

    const img = element.querySelector("img");
    img.style.position = "absolute"; // Ensure absolute positioning

    element.addEventListener("mousemove", function (e) {
        const rect = element.getBoundingClientRect();
        const diffX = e.clientX - rect.left; // cursor position relative to element
        const diffY = e.clientY - rect.top;

        //writing fot the rotation of the image
        diffrotate = e.clientX - rotate;
        rotate = e.clientX;

        // Get image size to center it on the cursor
        const imgWidth = img.offsetWidth;
        const imgHeight = img.offsetHeight;

        gsap.to(img, {
            opacity: 1,
            ease: "power3.out",
            top: diffY - imgHeight / 2, // center vertically
            left: diffX - imgWidth / 2, // center horizontally
            duration: 0.2,
            rotate: gsap.utils.clamp(-20, 20, diffrotate)
        });
    });

    element.addEventListener("mouseleave", function () {
        gsap.to(img, {
            opacity: 0,
            duration: 0.4,
            ease: "power3.out"
        });
    });
});

