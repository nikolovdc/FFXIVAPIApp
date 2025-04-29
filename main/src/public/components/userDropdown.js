// public/components/userDropdown.js
import { ToggleDisplay } from "./displayUtil.js"; 

/**
 * BuildUserDropdown
 * Build the user dropdown section, includes:
 * user profile icon, 
 * user name display,
 * user dropdown
 */
function BuildUserDropdown() {
    const userDropdownDiv = document.getElementById('user-dropdown');
    
    //User icon
    const iconImage = document.createElement("img");
    iconImage.id = 'user-dropdown-icon';
    iconImage.alt = "User Icon Image";
    userDropdownDiv.appendChild(iconImage);

    //User name display
    const usernameDiv = document.createElement("div");
    usernameDiv.id = "user-dropdown-name-div";
    const userName = document.createElement("span");
    userName.className = 'user-dropdown-name-span';
    userDropdownDiv.appendChild(userName);

    //Init the dropdown content
    const dropdownContent = document.createElement("div");
    dropdownContent.id = 'user-dropdown-content';
    dropdownContent.className = 'hide';
    userDropdownDiv.appendChild(dropdownContent);
    
    //Append the children of the dropdown
    BuildUserDropdownContent();
    
    //Mouseover will cause the userdropdown to show
    userDropdownDiv.addEventListener("mouseover", () => {
        ToggleDisplay('#user-dropdown-content', true);
    });
    //Mouseleave will cause the userdropdown to hide
    userDropdownDiv.addEventListener("mouseleave", () => {
        ToggleDisplay('#user-dropdown-content', false);
    });
};


/**
 * BuildUserDropdownContent
 * Build the user dropdown that includes:
 * button to access user profile page,
 * button to log out
 */
function BuildUserDropdownContent() {
    const dropdownContent = document.getElementById('user-dropdown-content');
    
    //Profile button
    const dropdownProfileDiv = document.createElement('div');
    const dropdownProfileSpan = document.createElement('span');
    dropdownProfileSpan.textContent = "Profile";
    dropdownProfileDiv.appendChild(dropdownProfileSpan);
    //On click will jump to user profile page
    dropdownProfileDiv.onclick = (e) => {
        location.href = "/profile";
    };

    //Logout button
    const dropdownLogoutDiv = document.createElement("div");
    const dropdownLogoutSpan = document.createElement("span");
    dropdownLogoutSpan.textContent = "Log out";
    dropdownLogoutDiv.appendChild(dropdownLogoutSpan);
    /** @todo On click will cause account log out */
    dropdownLogoutDiv.onclick = (e) => {
        
    };

    //Append the children
    dropdownContent.appendChild(dropdownProfileDiv);
    dropdownContent.appendChild(dropdownLogoutDiv);
};

export {
    BuildUserDropdown
};