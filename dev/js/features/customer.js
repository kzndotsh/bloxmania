class CustomerAddresses extends HTMLElement {
  constructor() {
    super();
    this.setupEventListeners();
  }

  setupEventListeners() {
    // Add new address button
    const addButtons = this.querySelectorAll('[data-address=""]');
    addButtons.forEach((button) => {
      button.addEventListener("click", this.openAddressModal.bind(this, "AddAddress"));
    });

    // Edit address buttons
    const editButtons = this.querySelectorAll('[data-address]:not([data-address=""])');
    editButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const addressData = JSON.parse(e.target.getAttribute("data-address"));
        this.openAddressModal("EditAddress", addressData);
      });
    });

    // Delete address buttons
    const deleteButtons = this.querySelectorAll("[data-target][data-confirm-message]");
    deleteButtons.forEach((button) => {
      button.addEventListener("click", this.handleDeleteAddress.bind(this));
    });

    // Modal close buttons
    const closeButtons = this.querySelectorAll(".address-form-modal__close, .address-form__cancel");
    closeButtons.forEach((button) => {
      button.addEventListener("click", this.closeAddressModal.bind(this));
    });

    // Country/Province dropdowns
    this.setupCountryProvinceSelectors();
  }

  openAddressModal(modalId, addressData = null) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    if (addressData && modalId === "EditAddress") {
      this.populateEditForm(addressData);
    }

    modal.removeAttribute("hidden");
    modal.setAttribute("aria-hidden", "false");

    // Focus first input
    const firstInput = modal.querySelector("input");
    if (firstInput) firstInput.focus();

    // Prevent body scroll
    document.body.style.overflow = "hidden";
  }

  closeAddressModal() {
    const modals = document.querySelectorAll(".address-form-modal");
    modals.forEach((modal) => {
      modal.setAttribute("hidden", "");
      modal.setAttribute("aria-hidden", "true");
    });

    // Restore body scroll
    document.body.style.overflow = "";
  }

  populateEditForm(addressData) {
    const form = document.querySelector("#EditAddress form");
    if (!form) return;

    // Set form action
    form.action = `/account/addresses/${addressData.id}`;

    // Populate form fields
    const fields = {
      AddressFirstNameEdit: addressData.first_name,
      AddressLastNameEdit: addressData.last_name,
      AddressCompanyEdit: addressData.company,
      AddressAddress1Edit: addressData.address1,
      AddressAddress2Edit: addressData.address2,
      AddressCityEdit: addressData.city,
      AddressZipEdit: addressData.zip,
      AddressPhoneEdit: addressData.phone,
    };

    Object.entries(fields).forEach(([id, value]) => {
      const field = document.getElementById(id);
      if (field && value) field.value = value;
    });

    // Set country and province
    const countrySelect = document.getElementById("AddressCountryEdit");
    const provinceContainer = document.getElementById("AddressProvinceContainerEdit");
    const provinceSelect = document.getElementById("AddressProvinceEdit");

    if (countrySelect && addressData.country) {
      countrySelect.value = addressData.country;
      this.updateProvinceOptions(countrySelect, provinceSelect, provinceContainer, addressData.province);
    }
  }

  handleDeleteAddress(e) {
    const target = e.target.getAttribute("data-target");
    const confirmMessage = e.target.getAttribute("data-confirm-message");

    if (confirm(confirmMessage)) {
      // Create and submit delete form
      const form = document.createElement("form");
      form.method = "post";
      form.action = target;

      const methodInput = document.createElement("input");
      methodInput.type = "hidden";
      methodInput.name = "_method";
      methodInput.value = "delete";

      const tokenInput = document.createElement("input");
      tokenInput.type = "hidden";
      tokenInput.name = "authenticity_token";
      tokenInput.value = document.querySelector('meta[name="csrf-token"]')?.getAttribute("content") || "";

      form.appendChild(methodInput);
      form.appendChild(tokenInput);
      document.body.appendChild(form);
      form.submit();
    }
  }

  setupCountryProvinceSelectors() {
    // Setup for new address form
    const newCountrySelect = document.getElementById("AddressCountryNew");
    const newProvinceSelect = document.getElementById("AddressProvinceNew");
    const newProvinceContainer = document.getElementById("AddressProvinceContainerNew");

    if (newCountrySelect) {
      newCountrySelect.addEventListener("change", () => {
        this.updateProvinceOptions(newCountrySelect, newProvinceSelect, newProvinceContainer);
      });
    }

    // Setup for edit address form
    const editCountrySelect = document.getElementById("AddressCountryEdit");
    const editProvinceSelect = document.getElementById("AddressProvinceEdit");
    const editProvinceContainer = document.getElementById("AddressProvinceContainerEdit");

    if (editCountrySelect) {
      editCountrySelect.addEventListener("change", () => {
        this.updateProvinceOptions(editCountrySelect, editProvinceSelect, editProvinceContainer);
      });
    }
  }

  updateProvinceOptions(countrySelect, provinceSelect, provinceContainer, selectedProvince = null) {
    const country = countrySelect.value;

    if (!country || !window.Countries || !window.Countries[country]) {
      provinceContainer.style.display = "none";
      return;
    }

    const provinces = window.Countries[country].provinces;
    if (!provinces || provinces.length === 0) {
      provinceContainer.style.display = "none";
      return;
    }

    // Clear existing options
    provinceSelect.innerHTML = "";

    // Add province options
    provinces.forEach((province) => {
      const option = document.createElement("option");
      option.value = province[0];
      option.textContent = province[1];
      if (selectedProvince && province[0] === selectedProvince) {
        option.selected = true;
      }
      provinceSelect.appendChild(option);
    });

    provinceContainer.style.display = "block";
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const customerAddresses = document.querySelector(".customer.addresses");
  if (customerAddresses) {
    new CustomerAddresses();
  }
});

// Handle modal clicks outside content
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("address-form-modal")) {
    const closeButton = e.target.querySelector(".address-form-modal__close");
    if (closeButton) closeButton.click();
  }
});

// Handle escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    const openModal = document.querySelector(".address-form-modal:not([hidden])");
    if (openModal) {
      const closeButton = openModal.querySelector(".address-form-modal__close");
      if (closeButton) closeButton.click();
    }
  }
});

// Countries data for province/state selection
window.Countries = window.Countries || {};

// This would typically be loaded from Shopify's countries API
// For now, adding basic structure for common countries
window.Countries = {
  "United States": {
    provinces: [
      ["AL", "Alabama"],
      ["AK", "Alaska"],
      ["AZ", "Arizona"],
      ["AR", "Arkansas"],
      ["CA", "California"],
      ["CO", "Colorado"],
      ["CT", "Connecticut"],
      ["DE", "Delaware"],
      ["FL", "Florida"],
      ["GA", "Georgia"],
      ["HI", "Hawaii"],
      ["ID", "Idaho"],
      ["IL", "Illinois"],
      ["IN", "Indiana"],
      ["IA", "Iowa"],
      ["KS", "Kansas"],
      ["KY", "Kentucky"],
      ["LA", "Louisiana"],
      ["ME", "Maine"],
      ["MD", "Maryland"],
      ["MA", "Massachusetts"],
      ["MI", "Michigan"],
      ["MN", "Minnesota"],
      ["MS", "Mississippi"],
      ["MO", "Missouri"],
      ["MT", "Montana"],
      ["NE", "Nebraska"],
      ["NV", "Nevada"],
      ["NH", "New Hampshire"],
      ["NJ", "New Jersey"],
      ["NM", "New Mexico"],
      ["NY", "New York"],
      ["NC", "North Carolina"],
      ["ND", "North Dakota"],
      ["OH", "Ohio"],
      ["OK", "Oklahoma"],
      ["OR", "Oregon"],
      ["PA", "Pennsylvania"],
      ["RI", "Rhode Island"],
      ["SC", "South Carolina"],
      ["SD", "South Dakota"],
      ["TN", "Tennessee"],
      ["TX", "Texas"],
      ["UT", "Utah"],
      ["VT", "Vermont"],
      ["VA", "Virginia"],
      ["WA", "Washington"],
      ["WV", "West Virginia"],
      ["WI", "Wisconsin"],
      ["WY", "Wyoming"],
    ],
  },
  Canada: {
    provinces: [
      ["AB", "Alberta"],
      ["BC", "British Columbia"],
      ["MB", "Manitoba"],
      ["NB", "New Brunswick"],
      ["NL", "Newfoundland and Labrador"],
      ["NT", "Northwest Territories"],
      ["NS", "Nova Scotia"],
      ["NU", "Nunavut"],
      ["ON", "Ontario"],
      ["PE", "Prince Edward Island"],
      ["QC", "Quebec"],
      ["SK", "Saskatchewan"],
      ["YT", "Yukon"],
    ],
  },
};
