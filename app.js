var Controller = (function() {


    //setInterval(UIController.moveArrowDown, 3000);
    //UIController.updateNav();
    try {
        languageTitle = document.getElementById("changeText"),
            mobileNavMenu = document.getElementById("mobile-nav-bar");
        mobileBurgerIcon = document.getElementById("mobileBurgerIcon");
        mobileCloseIcon = document.getElementById("mobileCloseIcon");
        mobileBurgerIcon.addEventListener("click", UIController.showMobileNav);
        mobileCloseIcon.addEventListener("click", UIController.hideMobileNav);
    } catch {

    };
    try {
        homeNavLink = document.getElementById("home-link");
        aboutNavLink = document.getElementById("about-link");
        portfolioNavLink = document.getElementById("portfolio-link");
        contactNavLink = document.getElementById("contact-link");
        currentArrow = document.getElementById("navCurrentArrow");

        homeNavLink.addEventListener("click", () => UIController.updateNav("home"));
        aboutNavLink.addEventListener("click", () => UIController.updateNav("about"));
        portfolioNavLink.addEventListener("click", () => UIController.updateNav("portfolio"));
        contactNavLink.addEventListener("click", () => UIController.updateNav("contact"));
    } catch {

    };

    function pageTransition() {

        var tl = gsap.timeline();
        tl.set('.loading-screen', { transformOrigin: "bottom left" });
        tl.to('.loading-screen', { duration: .5, scaleY: 1 });
        tl.to('.loading-screen', { duration: .5, scaleY: 0, skewX: 0, transformOrigin: "top left", ease: "power1.out", delay: 1 });
    }
    barba.init({
        transitions: [{
            name: 'opacity-transition',
            leave(data) {
                document.documentElement.style.overflow = "hidden";
                pageTransition()
                return gsap.to(data.current.container, {
                    opacity: 0,
                });
            },
            enter(data) {
                pageTransition()
                document.documentElement.style.overflow = "visible";
                return gsap.from(data.next.container, {
                    opacity: 0,
                });

            }
        }]
    });
});
//-----------------------------------------------------------
var UIController = (function() {

    text = ["你好!", "こんにちは!", "Привет!", "Bonjour!", "Halló!", "Γειά σου!", "สวัสดี!", "Hello!"],
        counter = 0
    return {
        changeTitle: (function() {
            languageTitle.classList.add('hide');
            setTimeout(function() {
                languageTitle.innerHTML = text[counter];
                languageTitle.classList.remove('hide');
                counter++;
                if (counter >= text.length) {
                    counter = 0;
                }
            }, 500);
        }),
        updateNav: (function(currentPage) {
            if (currentPage === "home") {
                currentArrow.style.top = homeNavLink.offsetTop + "px";
            } else if (currentPage === "about") {
                currentArrow.style.top = aboutNavLink.offsetTop + "px";
            } else if (currentPage === "portfolio") {
                currentArrow.style.top = portfolioNavLink.offsetTop + "px";
            } else if (currentPage === "contact") {
                currentArrow.style.top = contactNavLink.offsetTop + "px";
            } else {
                console.log("error");
            }
        }),
        moveArrowDown: (function() {
            scrollArrow.classList.add('move-arrow');
            setTimeout(function() {
                scrollArrow.classList.remove('move-arrow');
            }, 500)
        }),
        hideMobileNav: (function() {
            mobileNavMenu.classList.add("hide-menu");
            mobileCloseIcon.classList.add("hide-icon")
            mobileBurgerIcon.classList.remove("hide-icon")
        }),
        showMobileNav: (function() {
            mobileNavMenu.classList.remove("hide-menu");
            mobileCloseIcon.classList.remove("hide-icon")
            mobileBurgerIcon.classList.add("hide-icon")
        }),
    }

})();
window.addEventListener('DOMContentLoaded', (event) => {
    console.log(document.URL)
    if (document.URL.includes("index.html")) {
        UIController.updateNav("home");
        setInterval(UIController.changeTitle, 3000);
    } else if (document.URL.includes("about.html")) {
        UIController.updateNav("about");
    } else if (document.URL.includes("portfolio.html")) {
        UIController.updateNav("portfolio");
    } else if (document.URL.includes("contact.html")) {
        UIController.updateNav("contact");
    } else {
        console.log("Unknown error");
    }

    try {
        barba.Pjax.start();
    } catch {
        console.log("Already on that page");
    }
});
Controller();