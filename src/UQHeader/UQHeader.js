import styles from './css/main.css';

const template = document.createElement('template');
template.innerHTML = `
  <style>${styles.toString()}</style>
  <header class="uq-header">
      <div class="uq-header__container">
        <div class="nav-global">
          <div class="logo">
            <a class="logo--large" href="https://www.uq.edu.au/"><img alt="The University of Queensland" src="https://static.uq.net.au/v11/logos/corporate/uq-lockup-landscape--reversed.svg"></a>
            <a class="logo--small" href="https://www.uq.edu.au/"><img alt="The University of Queensland" src="https://static.uq.net.au/v11/logos/corporate/uq-logo--reversed.svg"></a>
          </div>
          <nav class="menu-global">
            <ul>
              <li><a href="https://contacts.uq.edu.au/">Contacts</a></li>
              <li><a href="https://future-students.uq.edu.au/">Study</a></li>
              <li><a href="https://maps.uq.edu.au/">Maps</a></li>
              <li><a href="https://www.uq.edu.au/news/">News</a></li>
              <li><a href="https://www.uq.edu.au/events/">Events</a></li>
              <li><a href="https://jobs.uq.edu.au/">Jobs</a></li>
              <li id="menu-item-library"><a href="https://www.library.uq.edu.au/">Library</a></li>
              <li><a href="https://giving.uq.edu.au/">Give now</a></li>
              <li><a href="https://my.uq.edu.au/">my.UQ</a></li>
              <li class="menu-global__search-toggle">
                <button class="search-toggle__button">Search</button>
              </li>
            </ul>
          </nav>
        </div>
        <div class="nav-search">
          <form class="nav-search__form" action="https://www.uq.edu.au/search/" method="get" accept-charset="UTF-8">
            <fieldset class="nav-search__wrapper">
              <legend class="hidden">
                <span class="nav-search__title">What are you looking for?</span>
              </legend>
              <span class="nav-search__title">What are you looking for?</span>
              <div class="nav-search__scope">
                <div class="nav-search__scope__radio-wrapper">
                  <div class="form-item">
                    <input type="radio" id="edit-as_sitesearch-off" name="as_sitesearch" value="" class="form-radio">
                    <label for="edit-as_sitesearch-off" class="option">Search all UQ websites</label>
                  </div>
                  <div class="form-item">
                    <input type="radio" id="edit-as_sitesearch-on" name="as_sitesearch" value="https://future-students.uq.edu.au/" checked="checked" class="form-radio">
                    <label for="edit-as_sitesearch-on" class="option" id="search-label">Search this website (future-students.uq.edu.au)</label>
                  </div>
                </div>
              </div>
            </fieldset>
            <div class="nav-search__query">
                <span class="search-query__wrapper">
                    <label for="edit-q" class="visually-hidden">Search term</label>
                    <input type="text" id="edit-q" name="q" value="" size="60" maxlength="128" class="search-query__input">
                    <span class="search-query__button">
                        <input type="submit" name="op" value="Search" class="search-query__submit">
                    </span>
                </span>
            </div>
            </form>

            <nav class="menu-global">
              <ul>
                <li><a href="https://contacts.uq.edu.au/">Contacts</a></li>
                <li><a href="https://www.uq.edu.au/news/">News</a></li>
                <li id="menu-item-library"><a href="https://www.library.uq.edu.au/">Library</a></li>
                <li><a href="https://future-students.uq.edu.au/">Study</a></li>
                <li><a href="https://www.uq.edu.au/events/">Events</a></li>
                <li><a href="https://giving.uq.edu.au/">Give now</a></li>
                <li><a href="https://maps.uq.edu.au/">Maps</a></li>
                <li><a href="https://jobs.uq.edu.au/">Jobs</a></li>
                <li><a href="https://my.uq.edu.au/">my.UQ</a></li>
              </ul>
            </nav>
        </div>
      </div>
    </header>
`;

let initCalled;


class UQHeader extends HTMLElement {
    constructor() {
        super();
        // Add a shadow DOM
        const shadowDOM = this.attachShadow({mode: 'open'});

        // Handle the attributes for this component

        // If the attribute hideLibraryMenuItem is true, remove it from the template
        const hideLibraryMenuItem = this.getAttribute('hideLibraryMenuItem');
        if(hideLibraryMenuItem === 'true') {
            template.content.getElementById('menu-item-library').remove();
        }

        // Append the label for the search widget
        const searchLabel = this.getAttribute('searchLabel');
        if(!!searchLabel) {
            const oldValue = template.content.getElementById('search-label').innerHTML;
            const newValue = oldValue.replace('future-students.uq.edu.au', searchLabel)
            template.content.getElementById('search-label').innerHTML = newValue;
        }

        // Append the url for the search widget
        const searchURL = this.getAttribute('searchURL');
        if(!!searchURL) {
            template.content.getElementById('edit-as_sitesearch-on').value = searchURL;
        }

        // Render the template
        shadowDOM.appendChild(template.content.cloneNode(true));

        // Bindings
        this.loadJS = this.loadJS.bind(this);
    }

    loadJS() {
        // This loads the external JS file into the HTML head dynamically
        //Only load js if it has not been loaded before (tracked by the initCalled flag)
        if (!initCalled) {
            //Dynamically import the JS file and append it to the document header
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.async = true;
            script.onload = function () {
                //Code to execute after the library has been downloaded parsed and processed by the browser starts here :)
                initCalled = true;
                // Initialise the header once this JS file is loaded
                new uq.header();
            };
            //Specify the location of the ITS DS JS file
            script.src = 'uq-header.js';

            //Append it to the document header
            document.head.appendChild(script);
        }
    };

    connectedCallback() {
        this.loadJS();
    }
}

export default UQHeader;
