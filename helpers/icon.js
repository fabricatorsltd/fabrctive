class FabrHelperIcon extends FabrHelper {
  constructor() {
    super();
    this.helperName = "Icon";
    this.iconsLibrary = "";
    this.iconDOMStructure = null;
  }

  setIconsLibraryFontAwesome() {
    // @@@IF NOT BUILD@@@
    this.debugger.log(
      `Setting icon library to fontawesome for {@@}`,
      this.component.reprX
    );
    // @@@ENDIF@@@

    this.iconsLibrary = "fontawesome";
    this.iconDOMStructure = document.createElement("i");
    this.iconDOMStructure.classList.add("fas", "fa-{{icon}}");
  }

  setIconsLibraryMaterial() {
    // @@@IF NOT BUILD@@@
    this.debugger.log(
      `Setting icon library to material for {@@}`,
      this.component.reprX
    );
    // @@@ENDIF@@@
    this.iconsLibrary = "material";
    this.iconDOMStructure = document.createElement("i");
    this.iconDOMStructure.classList.add("material-icons");
    this.iconDOMStructure.innerHTML = "{{icon}}";
  }

  setIconsLibraryBootstrap() {
    // @@@IF NOT BUILD@@@
    this.debugger.log(
      `Setting icon library to bootstrap for {@@}`,
      this.component.reprX
    );
    // @@@ENDIF@@@

    this.iconsLibrary = "bootstrap";
    this.iconDOMStructure = document.createElement("i");
    this.iconDOMStructure.classList.add("bi", "bi-{{icon}}");
  }

  new(icon) {
    if (this.iconDOMStructure === null) {
      // @@@IF NOT BUILD@@@
      this.debugger.warn(
        `No icon library set in {@@}, using default: material`,
        this.component.reprX
      );
      // @@@ENDIF@@@

      this.setIconsLibraryMaterial();
    }

    // @@@IF NOT BUILD@@@
    this.debugger.log(
      `Creating new "${icon}" icon for {@@} using ${this.iconsLibrary} library`,
      this.component.reprX
    );
    // @@@ENDIF@@@

    const iconElement = this.iconDOMStructure.cloneNode(true);
    iconElement.previousIcon = "{{icon}}";

    iconElement.changeIcon = (icon) => {
      console.log(iconElement.previousIcon);
      // @@@IF NOT BUILD@@@
      this.debugger.log(
        `Changing icon to "${icon}" for {@@} using ${this.iconsLibrary} library`,
        this.component.reprX
      );
      // @@@ENDIF@@@

      iconElement.innerHTML = iconElement.innerHTML.replace(
        iconElement.previousIcon,
        icon
      );
      iconElement.previousIcon = icon;
    };
    iconElement.changeIcon(icon);

    return iconElement;
  }
}
