
function findElement(element) {
    return document.querySelector(element);
}

var isExpandedMenu = false;
var menu = findElement('nav');

function expandMenu() {
    isExpandedMenu = !isExpandedMenu;

    if (isExpandedMenu) {
        menu.classList.add('is-expanded');
    } else {
        menu.classList.remove('is-expanded');
    }
}

function scrollToTop() {
    window.scrollTo({
        behavior: 'smooth',
        top: 0
    });
}

var sectionPortfolio, sectionAbout, sectionContact;

function setPositionOfSections() {
    sectionPortfolio = findElement('#portfolio').offsetTop;
    sectionAbout = findElement('#about').offsetTop;
    sectionContact = findElement('#contact').offsetTop;
};

setPositionOfSections()

window.addEventListener('resize', function() {
    setPositionOfSections();
})

function moveToSection(section) {
    var sectionId = section.path[0].id;
    var value = -72; // header height;

    if (sectionId == 'portfolioTab') {
        value = value + sectionPortfolio;
    } else if (sectionId == 'aboutTab') {
        value = value + sectionAbout;
    } else if (sectionId == 'contactTab') {
        value = value + sectionContact;
    }

    isExpandedMenu = !isExpandedMenu;
    menu.classList.remove('is-expanded');

    window.scrollTo({
        behavior: 'smooth',
        top: value
    });
}

var portfolioTab = findElement('#portfolioTab');
var aboutTab = findElement('#aboutTab');
var contactTab = findElement('#contactTab');

var tabs = [];

tabs.push(portfolioTab)
tabs.push(aboutTab)
tabs.push(contactTab)

function setActiveTab(tab) {
    for (var i = 0; i < tabs.length; i++) {
        if (tabs[i].id == tab.id) {
            tab.classList.add('is-active');
        } else {
            tabs[i].classList.remove('is-active');
        }
    }
}

function activeSection() {
    var headerHeight = -72; // header height;
    var currentScrollPosition = document.documentElement.scrollTop;

    if (currentScrollPosition >= headerHeight + sectionPortfolio && currentScrollPosition < headerHeight + sectionAbout) {
        setActiveTab(portfolioTab);
    } else if (currentScrollPosition >= headerHeight + sectionAbout && currentScrollPosition < headerHeight + sectionContact) {
        setActiveTab(aboutTab);
    } else if (currentScrollPosition >= headerHeight + sectionContact) {
        setActiveTab(contactTab);
    } else {
        setActiveTab('');
    }
}

var header = findElement('header');

function setHeaderHeight() {
    var currentScrollPosition = document.documentElement.scrollTop;

    if (currentScrollPosition > 80) {
        header.classList.add('is-smaller');
    } else {
        header.classList.remove('is-smaller');
    }
}

var scroller = findElement('.scroller');

window.addEventListener('scroll', function() {
    activeSection();
    setHeaderHeight();

    var currentScrollPosition = document.documentElement.scrollTop;

    if (currentScrollPosition > 80) {
        scroller.classList.add('is-exist');

        setTimeout(function(){
            scroller.classList.add('show');
        }, 500); // duration time animation
    } else {
        scroller.classList.remove('show');

        setTimeout(function(){
            scroller.classList.remove('is-exist');
        }, 500); // duration time animation
    }
});

window.onLoad = function() {
    activeSection();
    setHeaderHeight();
}

var portfolioData = [
    {
        Id: 1,
        Img: 'assets/images/cabin.png',
        Title: 'Log cabin'
    },
    {
        Id: 2,
        Img: 'assets/images/cake.png',
        Title: 'Tasty cake'
    },
    {
        Id: 3,
        Img: 'assets/images/circus.png',
        Title: 'Circus tent'
    },
    {
        Id: 4,
        Img: 'assets/images/game.png',
        Title: 'Controller'
    },
    {
        Id: 5,
        Img: 'assets/images/safe.png',
        Title: 'Locked safe'
    },
    {
        Id: 6,
        Img: 'assets/images/submarine.png',
        Title: 'Submarine'
    },
]

var modal = findElement('.modal');
var modalTitle = modal.querySelector('h2');
var modalImg = modal.querySelector('img');

function openModal(id) {
    modal.classList.add('is-exist');

    setTimeout(function(){
        document.body.classList.add('is-modal-open');
        modal.classList.add('show');
    }, 150); // duration time animation

    for (var i = 0; i < portfolioData.length; i++) {
        if (portfolioData[i].Id == id) {
            modalTitle.innerHTML = portfolioData[i].Title;
            modalImg.src = portfolioData[i].Img;
        }
    }

    document.addEventListener('keydown', function(event) {
        if (event.keyCode == 27) {
            closeModal();
        }
    });
}

function closeModal() {
    modal.classList.remove('show');

    setTimeout(function(){
        document.body.classList.remove('is-modal-open');
        modal.classList.remove('is-exist');
    }, 150); // duration time animation
}

var fields = [
    {
        container: '#name',
        input: 'input',
        error: 'Please enter your name.',
    },
    {
        container: '#email',
        input: 'input',
        error: 'Please enter your email address.',
    },
    {
        container: '#tel',
        input: 'input',
        error: 'Please enter your phone number.',
    },
    {
        container: '#message',
        input: 'textarea',
        error: 'Please enter a message.'
    }
];

function formWatcher() {
    fields.forEach(function (field) {
        var container = document.querySelector(field.container);
        var input = container.querySelector(field.input);

        input.addEventListener('keyup', function() {
            if (this.value) {
                container.classList.add('show-label');
            } else {
                container.classList.remove('show-label');
            }
        });
    });
};

formWatcher();

function validateForm() {
    fields.forEach(function (field) {
        var container = document.querySelector(field.container);
        var input = container.querySelector(field.input);

        container.querySelector('ul').innerHTML = input.value ? '' : '<li>' + field.error + '</li>';
    });
}

document.querySelector('#send').addEventListener('click', function (event) {
    event.preventDefault();

    validateForm();
});
