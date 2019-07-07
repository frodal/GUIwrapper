# GUI wrapper

![GitHub](https://img.shields.io/github/license/frodal/GUIwrapper.svg)
![GitHub top language](https://img.shields.io/github/languages/top/frodal/GUIwrapper.svg)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/frodal/GUIwrapper.svg)
![GitHub issues](https://img.shields.io/github/issues-raw/frodal/GUIwrapper.svg)
![GitHub tag (latest by date)](https://img.shields.io/github/tag-date/frodal/GUIwrapper.svg)

A simple cross platform graphical user interface (GUI) wrapper to launch executable desktop applications.
Buildt with JavaScript, HTML, and CSS.
Compatible with Windows, Linux and MacOS.
Download the latest version [here](https://github.com/frodal/GUIwrapper/releases).

![GUIwrapper image](GUIwrapper.png "GUIwrapper")

## Getting Started

To get a local copy up and running follow these simple steps.

1. Clone the project or download from Github (`git clone https://github.com/frodal/GUIwrapper.git`)
2. Install [Node.js](https://nodejs.org) and on the screen that allows you to configure the installation, make sure to select the `Node.js runtime`, `npm package manager`, and `Add to PATH` options
3. Install [Electron](https://electronjs.org/docs/tutorial/first-app#installing-electron) by running `npm install --save-dev electron` using the command line in the GUIwrapper directory
4. Then run `npm start` in the GUIwrapper directory to start the GUIwrapper application

### Build

See [releases](https://github.com/frodal/GUIwrapper/releases) for prebuilt binaries, or build it your self by following these steps

1. Make sure to do steps 1-3 above first
2. To build the GUIwrapper application, install [Electron-packager](https://github.com/electron-userland/electron-packager) by running `npm install --save-dev electron-packager` using the command line in the GUIwrapper directory
3. Then run `npm run build` in the GUIwrapper directory to build for all suported platforms, i.e., Windows, Linux and MacOS. Note that this will build to a directory outside of the GUIwrapper directory, i.e., `../GUIwrapperBinaries/`

### Windows installer

See [releases](https://github.com/frodal/GUIwrapper/releases) for prebuilt installers

1. Make sure to do steps 1-3 above first
2. To build the GUIwrapper application, install [Electron-installer-windows](https://github.com/electron-userland/electron-packager) by running `npm install --save-dev electron-installer-windows` using the command line in the GUIwrapper directory
3. Then run `npm run setup` in the GUIwrapper directory to build the windows installer. Note that this will build to a directory outside of the GUIwrapper directory, i.e., `../GUIwrapperBinaries/installers/`

## Contributing

To contribute:

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the [MIT License](https://mit-license.org/).
See `LICENSE.md` for more information.

## Contact

Bjørn Håkon Frodal - [@frodal](https://github.com/frodal) - bjorn.h.frodal@ntnu.no

Project Link: [https://github.com/frodal/GUIwrapper](https://github.com/frodal/GUIwrapper)
