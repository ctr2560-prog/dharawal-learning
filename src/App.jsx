import { useState } from 'react';
import LandingPage from './components/LandingPage.jsx';
import Acknowledgement from './components/Acknowledgement.jsx';
import MainMenu from './components/MainMenu.jsx';
import ChatBot from './components/ChatBot.jsx';
import CardGame from './components/CardGame.jsx';
import FillBlanks from './components/FillBlanks.jsx';
import ColouringIn from './components/ColouringIn.jsx';
import WordList from './components/WordList.jsx';
import TeacherHub from './components/TeacherHub.jsx';
import SpeedRound from './components/SpeedRound.jsx';
import WordScramble from './components/WordScramble.jsx';
import Jeopardy from './components/Jeopardy.jsx';
import FamilyFeud from './components/FamilyFeud.jsx';
import AnimalSounds from './components/AnimalSounds.jsx';
import './App.css';

export default function App() {
  const [page, setPage] = useState('landing');

  function navigate(to) {
    setPage(to);
    window.scrollTo(0, 0);
  }

  return (
    <div className="app">
      {page === 'landing' && (
        <LandingPage onEnter={() => navigate('acknowledgement')} />
      )}
      {page === 'acknowledgement' && (
        <Acknowledgement onNext={() => navigate('menu')} />
      )}
      {page === 'menu' && (
        <MainMenu onNavigate={navigate} />
      )}
      {page === 'chat' && (
        <ChatBot onBack={() => navigate('menu')} />
      )}
      {page === 'cards' && (
        <CardGame onBack={() => navigate('menu')} />
      )}
      {page === 'blanks' && (
        <FillBlanks onBack={() => navigate('menu')} />
      )}
      {page === 'colour' && (
        <ColouringIn onBack={() => navigate('menu')} />
      )}
      {page === 'wordlist' && (
        <WordList onBack={() => navigate('menu')} />
      )}
      {page === 'teacher' && (
        <TeacherHub onBack={() => navigate('menu')} />
      )}
      {page === 'speedround' && (
        <SpeedRound onBack={() => navigate('menu')} />
      )}
      {page === 'scramble' && (
        <WordScramble onBack={() => navigate('menu')} />
      )}
      {page === 'jeopardy' && (
        <Jeopardy onBack={() => navigate('menu')} />
      )}
      {page === 'feud' && (
        <FamilyFeud onBack={() => navigate('menu')} />
      )}
      {page === 'animalsounds' && (
        <AnimalSounds onBack={() => navigate('menu')} />
      )}
    </div>
  );
}
