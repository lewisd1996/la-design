var Controller = (function() {
    try {
        languageTitle = document.getElementById("changeText");
        mobileNavMenu = document.getElementById("mobile-nav-bar");
        mobileBurgerIcon = document.getElementById("mobileBurgerIcon");
        mobileCloseIcon = document.getElementById("mobileCloseIcon");
        mobileBurgerIcon.addEventListener("click", UIController.showMobileNav);
        mobileCloseIcon.addEventListener("click", UIController.hideMobileNav);
        hover1 = document.getElementById('mobile-hover-1');
        hover2 = document.getElementById('mobile-hover-2');
        hover3 = document.getElementById('mobile-hover-3');
        hover4 = document.getElementById('mobile-hover-4');

        card1 = document.getElementById('mobile-card-1');
        card2 = document.getElementById('mobile-card-2');
        card3 = document.getElementById('mobile-card-3');
        card4 = document.getElementById('mobile-card-4');

        hover1.addEventListener("click", event => {
            card1.classList.toggle("mobile-rotate-card")
        });
        hover2.addEventListener("click", event => {
            card2.classList.toggle("mobile-rotate-card")
        });
        hover3.addEventListener("click", event => {
            card3.classList.toggle("mobile-rotate-card")
        });
        hover4.addEventListener("click", event => {
            card4.classList.toggle("mobile-rotate-card")
        });
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
        Console.log("Unknown Error");
    };



    function pageTransition() {

        var tl = gsap.timeline();
        tl.set('.loading-screen', { transformOrigin: "bottom left" });
        tl.to('.loading-screen', { duration: .5, scaleY: 1 });
        tl.to('.loading-screen', { duration: .5, scaleY: 0, skewX: 0, transformOrigin: "top left", ease: "power1.out", delay: 1 });
    }
    barba.init({

        transitions: [{
            leave(data) {
                document.getElementById("nav-bar").style.pointerEvents = "none";
                document.documentElement.style.overflow = "hidden";
                pageTransition()
                return gsap.to(data.current.container, {
                    opacity: 0,
                });
            },
            enter(data) {
                pageTransition()
                document.documentElement.style.overflow = "visible";
                document.getElementById("nav-bar").style.pointerEvents = "all";
                return gsap.from(data.next.container, {
                    opacity: 0,
                });

            }
        }],
        views: [{
            namespace: 'home',
            beforeLeave(data) {

            },
            beforeEnter(data) {
                UIController.updateNav("home");
                setInterval((function() {
                    languageTitle.classList.add('hide');
                    setTimeout(function() {
                        languageTitle.innerHTML = text[counter];
                        languageTitle.classList.remove('hide');
                        counter++;
                        if (counter >= text.length) {
                            counter = 0;
                        }
                    }, 500);
                }), 1000);
            }
        }, {
            namespace: 'about',
            beforeLeave(data) {

            },
            beforeEnter(data) {
                UIController.updateNav("about");
            }
        }, {
            namespace: 'portfolio',
            beforeLeave(data) {

            },
            beforeEnter(data) {
                UIController.updateNav("portfolio");
            }
        }, {
            namespace: 'contact',
            beforeLeave(data) {

            },
            beforeEnter(data) {
                UIController.updateNav("contact");
                try {
                    contactForm = document.getElementById("contactForm");
                    inputName = document.getElementById("Name");
                    inputEmail = document.getElementById("Email");
                    inputSubject = document.getElementById("Subject");
                    inputMessage = document.getElementById("Message");
                    submitButton = document.getElementById("submitButton");

                    inputName.addEventListener('input', UIController.enableSubmitBtn);
                    inputEmail.addEventListener('input', UIController.enableSubmitBtn);
                    inputSubject.addEventListener('input', UIController.enableSubmitBtn);
                    inputMessage.addEventListener('input', UIController.enableSubmitBtn);
                } catch {

                };
                UIController.enableSubmitBtn();
            }
        }]
    });
});
//-----------------------------------------------------------
var UIController = (function() {

    text = ["你好!", "こんにちは!", "Привет!", "Bonjour!", "Halló!", "Γειά σου!", "สวัสดี!", "Hello!"];
    counter = 0;
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
        enableSubmitBtn: (function() {
            submitButton.classList.add("disable-button");
            if (inputName.checkValidity() &&
                inputEmail.checkValidity() &&
                inputSubject.checkValidity() &&
                inputMessage.checkValidity()
            )
                submitButton.classList.remove("disable-button");
        })
    }

})();
window.addEventListener('DOMContentLoaded', (event) => {
    try {
        barba.Pjax.start();
    } catch {
        console.log("Already on that page");
    }
});
Controller();