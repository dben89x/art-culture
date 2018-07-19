import ReactOnRails from 'react-on-rails';
import ContactForm from '../components/ContactForm';
import SubscribeForm from '../components/SubscribeForm';
import ArtworkCirculationCarousel from '../components/ArtworkCirculationCarousel';
import TradingHistory from '../components/TradingHistory';
import ArtworkGallery from '../components/ArtworkGallery';
import RecentListings from '../components/RecentListings';
import ArtCarousel from '../components/ArtCarousel';
import NavBar from '../components/NavBar';

import Home from '../components/pages/Home';

import AuthForms from '../components/auth/AuthForms';
import Signup from '../components/auth/Signup';
import Signin from '../components/auth/Signin';
import ForgotPassword from '../components/auth/ForgotPassword';

ReactOnRails.register({
  ContactForm,
  SubscribeForm,
  ArtworkCirculationCarousel,
  TradingHistory,
  ArtworkGallery,
  RecentListings,
  ArtCarousel,
  Home,
  NavBar,
  AuthForms,
  Signup,
  Signin,
  ForgotPassword,
});
