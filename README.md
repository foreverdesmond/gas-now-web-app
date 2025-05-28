# Gas Now Web App

A real-time Ethereum gas fee tracking application that provides users with current gas prices, transaction time estimates, and ETH price information across multiple blockchain networks.

## 🌟 Features

- **Real-time Gas Fee Tracking**: Monitor current gas prices with 6-second refresh intervals
- **Multiple Network Support**: Supports Ethereum, Arbitrum, Optimism, Base, Linea, and zkSync networks
- **Visual Progress Indicators**: Gradient fill animations that sync with data refresh cycles
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Gas Fee Categories**:
  - Turbo (~12 seconds)
  - Fast (~48 seconds)
  - Standard (~2 minutes)
  - Economy (~3 minutes)
  - Saver (~4 minutes)
- **Current ETH Price**: Real-time ETH/USD and ETH/BTC price tracking with 12-second refresh
- **Network Information**: Display current base fee and block number
- **Interactive UI**: Modern card-based interface with smooth animations

## 🚀 Demo

Visit the live application: 
http://www.gasnow.link:3000/

## 📦 Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Setup

1. Clone the repository:

```bash
git clone https://github.com/foreverdesmond/gas-now-web-app.git
cd gas-now-web-app
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## 🏗️ Build

To create a production build:

```bash
npm run build
```

This builds the app for production to the `build` folder, optimizing the build for the best performance.

## 🎨 Key Components

### GasFeeCard

- Displays gas fee information with category-specific colors
- Features bottom-to-top gradient fill animation
- Includes custom icons for each gas fee category
- Responsive design for all screen sizes

### CurrentPriceCard

- Shows real-time ETH prices in USD and BTC
- Features left-to-right gradient fill animation
- 12-second refresh interval
- Beautiful gradient border effects

### NetworkInfoCard

- Displays current network information
- Shows base fee and latest block number
- Network-specific branding and colors


## 📱 Responsive Design

The application is fully responsive and provides optimal viewing experience across:

- Desktop (≥992px)
- Tablet (576px - 991px)
- Mobile (<576px)

## 🎯 API Integration

### Gas Fee Service

- Endpoint: `/api/GasFeeBlockNavie/currentgas?networkId={id}`
- Refresh interval: 6 seconds
- Provides gas price estimates for different speed categories

### Price Service

- Endpoint: `/api/Price/currentprice`
- Refresh interval: 12 seconds
- Provides current ETH/USD and ETH/BTC prices

## 🛠️ Technologies Used

- **React** (v17.0.2) - Frontend framework
- **Ant Design** (v5.22.3) - UI component library
- **Axios** (v0.21.1) - HTTP client for API requests
- **CSS3** - Custom styling and animations
- **React Hooks** - State management and lifecycle methods

## 📊 Animation Features

- **Gradient Fill Effects**: Visual progress indicators that sync with data refresh cycles
- **Smooth Transitions**: RequestAnimationFrame-based animations for optimal performance
- **Color-coded Categories**: Each gas fee category has distinct colors and animations
- **Icon Integration**: Custom icons with white filter effects for dark theme compatibility

## 🚀 Deployment

The application can be deployed to various platforms:

### Netlify

1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `build`

### Vercel

1. Import your GitHub repository
2. Vercel will automatically detect the React configuration

### GitHub Pages

1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
   }
   ```
3. Run: `npm run deploy`

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Ethereum community for gas fee APIs
- Ant Design team for the excellent UI components
- React community for the robust frontend framework

## 📞 Support

If you encounter any issues or have questions, please [open an issue](https://github.com/foreverdesmond/gas-now-web-app/issues) on GitHub.

---

**Made with ❤️ for the Ethereum community**
