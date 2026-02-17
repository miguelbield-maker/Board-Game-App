import React, { useState, createContext, useContext } from 'react';
import { ChevronLeft, Calendar, MapPin, Users, Bell, User, Plus, Search, Star, X, Check, Filter, MessageCircle, Send, LogOut, Home, Clock, Award, Dices } from 'lucide-react';

// Context for global state
const AppContext = createContext();

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([
    { 
      id: '1', 
      email: 'demo@test.com', 
      password: 'password', 
      firstName: 'Demo',
      nickname: 'DemoPlayer',
      bio: 'Love strategy games and meeting new people!',
      image: ''
    },
    { 
      id: '2', 
      email: 'alice@test.com', 
      password: 'password', 
      firstName: 'Alice',
      nickname: 'BoardQueen',
      bio: 'Competitive player who loves euro games',
      image: ''
    },
    { 
      id: '3', 
      email: 'bob@test.com', 
      password: 'password', 
      firstName: 'Bob',
      nickname: 'DiceRoller',
      bio: 'Casual gamer, here for the fun and snacks!',
      image: ''
    },
    { 
      id: '4', 
      email: 'charlie@test.com', 
      password: 'password', 
      firstName: 'Charlie',
      nickname: 'MeepleKing',
      bio: 'Board game collector with 200+ games',
      image: ''
    },
    { 
      id: '5', 
      email: 'diana@test.com', 
      password: 'password', 
      firstName: 'Diana',
      nickname: 'CardShark',
      bio: 'Love deck-building games!',
      image: ''
    },
    { 
      id: '6', 
      email: 'eve@test.com', 
      password: 'password', 
      firstName: 'Eve',
      nickname: 'QueenOfHearts',
      bio: 'Tabletop enthusiast who loves Dominion and Pandemic!',
      image: ''
    },
    { 
      id: '7', 
      email: 'frank@test.com', 
      password: 'password', 
      firstName: 'Frank',
      nickname: 'RollMaster',
      bio: 'Hardcore gamer. Bring your A-game!',
      image: ''
    }
  ]);
  const [events, setEvents] = useState([
    {
      id: '1',
      title: 'Catan Night',
      description: 'Join us for an epic Settlers of Catan game!',
      gameName: 'Settlers of Catan',
      date: '2025-12-05',
      time: '19:00',
      location: 'Singapore, Singapore',
      city: 'Singapore',
      country: 'Singapore',
      maxPlayers: 4,
      currentPlayers: 3,
      experience: ['intermediate'],
      hostId: '1',
      applicants: [
        { userId: '4', status: 'pending', message: 'Hi! I have a great collection of games and would love to join. I can bring snacks too!' },
        { userId: '5', status: 'pending', message: 'Looking forward to playing Catan with you all!' }
      ],
      attendees: ['1', '2', '3'],
      status: 'upcoming'
    },
    {
      id: '2',
      title: 'Ticket to Ride Tournament',
      description: 'Come join us for a fun Ticket to Ride session! All experience levels welcome — we will do a quick rules recap at the start. Bring your competitive spirit!',
      gameName: 'Ticket to Ride',
      date: '2025-12-12',
      time: '18:30',
      location: 'Singapore, Singapore',
      city: 'Singapore',
      country: 'Singapore',
      maxPlayers: 5,
      currentPlayers: 3,
      experience: ['beginner', 'intermediate'],
      hostId: '2',
      applicants: [],
      attendees: ['2', '3', '4'],
      status: 'upcoming'
    },
    {
      id: '3',
      title: 'Dominion Deck-Building Night',
      description: 'Come try Dominion — the classic deck-building game! Eve will walk you through the rules. Open to all skill levels, snacks provided.',
      gameName: 'Dominion',
      date: '2025-12-18',
      time: '19:00',
      location: 'Singapore, Singapore',
      city: 'Singapore',
      country: 'Singapore',
      maxPlayers: 4,
      currentPlayers: 1,
      experience: ['beginner', 'intermediate'],
      hostId: '6',
      applicants: [],
      attendees: ['6'],
      status: 'upcoming'
    },
    {
      id: '4',
      title: 'Twilight Imperium Marathon',
      description: 'A full-day Twilight Imperium session for serious gamers only. Frank will provide food and drinks. Expect 8+ hours of epic space conquest!',
      gameName: 'Twilight Imperium',
      date: '2025-12-20',
      time: '10:00',
      location: 'Singapore, Singapore',
      city: 'Singapore',
      country: 'Singapore',
      maxPlayers: 6,
      currentPlayers: 1,
      experience: ['intermediate', 'master'],
      hostId: '7',
      applicants: [],
      attendees: ['7'],
      status: 'upcoming'
    }
  ]);
  const [notifications, setNotifications] = useState({});
  const [reviews, setReviews] = useState({
    '1': [
      { rating: 5, comment: 'Great host!', reviewerId: '2', eventId: '1' },
      { rating: 4, comment: 'Fun game!', reviewerId: '3', eventId: '1' }
    ],
    '2': [
      { rating: 5, comment: 'Very competitive and fun!', reviewerId: '1', eventId: '1' }
    ],
    '3': [
      { rating: 4, comment: 'Super chill player', reviewerId: '1', eventId: '1' }
    ],
    '4': [
      { rating: 5, comment: 'Amazing game collection!', reviewerId: '1', eventId: '1' },
      { rating: 5, comment: 'Very knowledgeable', reviewerId: '2', eventId: '1' }
    ],
    '5': [
      { rating: 4, comment: 'Great at card games', reviewerId: '3', eventId: '1' }
    ]
  });
  const [chats, setChats] = useState({
    '1': [
      {
        id: 'system-init-1',
        userId: 'system',
        message: `Hey @DemoPlayer, @BoardQueen, @DiceRoller! You've assembled a great group for Settlers of Catan. @DemoPlayer, please share the exact location and any other details (parking, what to bring, etc.) when you're ready. 🎲`,
        timestamp: new Date('2025-11-20T10:00:00'),
        isSystem: true
      }
    ]
  });
  const [lastRead, setLastRead] = useState({}); // Track when users last read each chat

  // GameHub - Reloaded
  return (
    <AppContext.Provider value={{
      currentUser, setCurrentUser,
      users, setUsers,
      events, setEvents,
      notifications, setNotifications,
      reviews, setReviews,
      chats, setChats,
      lastRead, setLastRead
    }}>
      <BoardGameApp />
    </AppContext.Provider>
  );
};

const BoardGameApp = () => {
  const { currentUser } = useContext(AppContext);
  const [screen, setScreen] = useState('home');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [navigationHistory, setNavigationHistory] = useState(['home']); // Track navigation history
  const [customBackHandler, setCustomBackHandler] = useState(null); // Allow screens to override back

  // Custom navigation function that tracks history
  const navigateTo = (newScreen) => {
    setNavigationHistory(prev => [...prev, newScreen]);
    setScreen(newScreen);
  };

  // Navigate back using history, or custom handler if set
  const navigateBack = () => {
    if (customBackHandler) {
      customBackHandler();
      return;
    }
    if (navigationHistory.length > 1) {
      const newHistory = [...navigationHistory];
      newHistory.pop(); // Remove current screen
      const previousScreen = newHistory[newHistory.length - 1];
      setNavigationHistory(newHistory);
      setScreen(previousScreen);
    } else {
      setScreen('home');
    }
  };

  // Reset to home when user logs in
  React.useEffect(() => {
    if (currentUser) {
      setScreen('home');
      setNavigationHistory(['home']);
    }
  }, [currentUser]);

  if (!currentUser) {
    return <AuthScreen />;
  }

  const renderScreen = () => {
    switch (screen) {
      case 'home':
        return <HomeScreen onNavigate={navigateTo} onSelectEvent={setSelectedEvent} />;
      case 'eventDetail':
        return <EventDetailScreen event={selectedEvent} onBack={navigateBack} onNavigate={navigateTo} />;
      case 'createEvent':
        return <CreateEventScreen onBack={navigateBack} />;
      case 'myEvents':
        return (
          <div className="p-4">
            <MyEventsScreen onNavigate={navigateTo} onSelectEvent={setSelectedEvent} />
          </div>
        );
      case 'notifications':
        return (
          <div className="p-4 space-y-3">
            <NotificationsScreen onBack={navigateBack} onNavigate={navigateTo} onSelectEvent={setSelectedEvent} />
          </div>
        );
      case 'manageApplicants':
        return <ManageApplicantsScreen event={selectedEvent} onBack={navigateBack} onEventFull={(event) => { setSelectedEvent(event); navigateTo('eventDetail'); }} />;
      case 'reviewEvent':
        return <ReviewEventScreen event={selectedEvent} onBack={navigateBack} />;
      case 'chat':
        return <EventChatScreen event={selectedEvent} onBack={navigateBack} />;
      case 'profile':
        return <ProfileScreen onBack={navigateBack} onSetBackHandler={setCustomBackHandler} />;
      case 'groupChats':
        return <GroupChatsScreen onBack={navigateBack} onNavigate={navigateTo} onSelectEvent={setSelectedEvent} />;
      default:
        return <HomeScreen onNavigate={navigateTo} onSelectEvent={setSelectedEvent} />;
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 min-h-screen flex flex-col">
      <Header onNavigate={navigateTo} currentScreen={screen} onBack={navigateBack} />
      <div className="flex-1 overflow-y-auto pb-20">
        {renderScreen()}
      </div>
      <BottomNav currentScreen={screen} onNavigate={navigateTo} />
    </div>
  );
};

const Header = ({ onNavigate, currentScreen, onBack }) => {
  const { currentUser, notifications } = useContext(AppContext);
  const userNotifications = notifications[currentUser?.id] || [];
  const unreadCount = userNotifications.filter(n => !n.read).length;

  const getTitle = () => {
    switch(currentScreen) {
      case 'myEvents':
        return 'My Events';
      case 'notifications':
        return 'Notifications';
      case 'groupChats':
        return 'Event Chats';
      case 'profile':
        return 'Profile';
      case 'createEvent':
        return 'Create Event';
      case 'eventDetail':
        return 'Event Details';
      case 'chat':
        return 'Event Chat';
      case 'manageApplicants':
        return 'Manage Applicants';
      case 'reviewEvent':
        return 'Review Event';
      default:
        return 'GameHub';
    }
  };

  const showBackButton = currentScreen !== 'home';

  const handleBack = () => {
    onBack();
  };

  return (
    <div className="bg-orange-500 text-white p-4 flex justify-between items-center shadow-lg">
      <div className="w-10">
        {showBackButton && (
          <button onClick={handleBack} className="hover:scale-110 transition-transform">
            <ChevronLeft size={24} />
          </button>
        )}
      </div>
      <h1 className="text-2xl font-bold tracking-wide">{getTitle()}</h1>
      <button onClick={() => onNavigate('notifications')} className="relative hover:scale-110 transition-transform">
        <Bell size={24} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>
    </div>
  );
};

const BottomNav = ({ currentScreen, onNavigate }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'myEvents', label: 'My Events', icon: Calendar },
    { id: 'createEvent', label: 'Create', icon: Plus },
    { id: 'groupChats', label: 'Chats', icon: MessageCircle },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
      <div className="max-w-md mx-auto flex justify-around items-center py-2">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;
          const isCreateButton = item.id === 'createEvent';
          
          if (isCreateButton) {
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="flex flex-col items-center justify-center p-2 -mt-6"
              >
                <div className="bg-gradient-to-r from-purple-600 to-orange-500 text-white rounded-full p-4 shadow-lg">
                  <Icon size={24} />
                </div>
              </button>
            );
          }
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center p-2 min-w-[60px] transition-colors ${
                isActive 
                  ? 'text-purple-600' 
                  : 'text-gray-400'
              }`}
            >
              <Icon size={24} />
              <span className="text-xs mt-1 font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

const AuthScreen = ({ onLogin }) => {
  const { users, setUsers, setCurrentUser } = useContext(AppContext);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    setError('');

    console.log('Login attempt:', { email, password, isSignUp });
    console.log('Current users:', users);

    if (isSignUp) {
      if (users.find(u => u.email === email)) {
        setError('Email already exists');
        return;
      }
      const newUser = {
        id: Date.now().toString(),
        email,
        password,
        firstName,
        nickname,
        bio: '',
        image: ''
      };
      console.log('Creating new user:', newUser);
      const updatedUsers = [...users, newUser];
      setUsers(updatedUsers);
      console.log('Setting current user to:', newUser);
      setCurrentUser(newUser);
    } else {
      const user = users.find(u => {
        console.log('Checking user:', u, 'against', { email, password });
        return u.email === email && u.password === password;
      });
      console.log('Found user:', user);
      if (user) {
        console.log('Setting current user to:', user);
        setCurrentUser(user);
      } else {
        setError('Invalid credentials. Please check email and password.');
        console.log('Login failed - invalid credentials');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent mb-2">
            GameHub
          </h2>
          <p className="text-gray-600">Connect. Play. Enjoy.</p>
        </div>
        <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">
          {isSignUp ? 'Join GameHub' : 'Welcome Back'}
        </h3>
        <div className="space-y-4">
          {isSignUp && (
            <>
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full p-3 border rounded-lg"
                required
              />
              <input
                type="text"
                placeholder="Nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="w-full p-3 border rounded-lg"
                required
              />
            </>
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-lg"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-lg"
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button 
            type="button" 
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-purple-600 to-orange-500 text-white p-3 rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-105"
          >
            {isSignUp ? 'Create Account' : 'Log In'}
          </button>
        </div>
        <p className="text-center mt-4 text-gray-600">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button onClick={() => setIsSignUp(!isSignUp)} className="text-purple-600 font-semibold hover:text-orange-500 transition">
            {isSignUp ? 'Log In' : 'Sign Up'}
          </button>
        </p>
        <div className="mt-4 p-3 bg-gray-100 rounded text-sm space-y-1">
          <p className="font-semibold">Demo Accounts (password: <span className="font-mono">password</span>)</p>
          <p>🎮 <span className="font-mono">demo@test.com</span> — DemoPlayer</p>
          <p>👑 <span className="font-mono">eve@test.com</span> — QueenOfHearts (host)</p>
          <p>🎲 <span className="font-mono">frank@test.com</span> — RollMaster (host)</p>
        </div>
      </div>
    </div>
  );
};

const HomeScreen = ({ onNavigate, onSelectEvent }) => {
  const { currentUser, events, users } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filterCity, setFilterCity] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [filterExperience, setFilterExperience] = useState('');

  const upcomingEvents = events.filter(e => e.status === 'upcoming');
  
  // Filter out full events unless user is an attendee or has a pending application
  // Also hide events where user has been rejected
  const visibleEvents = upcomingEvents.filter(e => {
    const isFull = e.attendees.length >= e.maxPlayers;
    const isAttendee = e.attendees.includes(currentUser.id);
    const userApplication = e.applicants.find(a => a.userId === currentUser.id);
    const hasPendingApplication = !!userApplication;
    const wasRejected = userApplication?.status === 'rejected';

    if (wasRejected) return false;
    return !isFull || isAttendee || hasPendingApplication;
  });
  
  const filteredEvents = visibleEvents.filter(e => {
    const matchesSearch = e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         e.gameName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = !filterCity || e.city.toLowerCase().includes(filterCity.toLowerCase());
    const matchesDate = !filterDate || e.date === filterDate;
    const matchesExperience = !filterExperience || (Array.isArray(e.experience) ? e.experience.includes(filterExperience) : e.experience === filterExperience);
    
    return matchesSearch && matchesCity && matchesDate && matchesExperience;
  });

  const clearFilters = () => {
    setFilterCity('');
    setFilterDate('');
    setFilterExperience('');
  };

  const hasActiveFilters = filterCity || filterDate || filterExperience;

  const getHostName = (hostId) => {
    const host = users.find(u => u.id === hostId);
    return host?.nickname || host?.firstName || 'Unknown';
  };

  return (
    <div className="p-4">
      <div className="relative mb-6">
        <Search className="absolute left-3 top-3 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search events or games..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-12 p-3 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none transition"
        />
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`absolute right-3 top-3 ${hasActiveFilters ? 'text-purple-600' : 'text-gray-400'}`}
        >
          <Filter size={20} />
        </button>
      </div>

      {showFilters && (
        <div className="bg-white border-2 border-purple-100 rounded-2xl p-4 mb-6 space-y-4 shadow-lg">
          <h4 className="font-bold text-lg text-gray-800">Filters</h4>
          
          <div>
            <label className="block text-sm font-bold mb-2 text-gray-700">City</label>
            <input
              type="text"
              placeholder="Enter city..."
              value={filterCity}
              onChange={(e) => setFilterCity(e.target.value)}
              className="w-full p-2 border-2 border-gray-200 rounded-lg focus:border-purple-400 focus:outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2 text-gray-700">Date</label>
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full p-2 border-2 border-gray-200 rounded-lg focus:border-purple-400 focus:outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2 text-gray-700">Experience Level</label>
            <select
              value={filterExperience}
              onChange={(e) => setFilterExperience(e.target.value)}
              className="w-full p-2 border-2 border-gray-200 rounded-lg focus:border-purple-400 focus:outline-none transition"
            >
              <option value="">All levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="master">Master</option>
            </select>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              onClick={() => setShowFilters(false)}
              className="flex-1 bg-gradient-to-r from-purple-600 to-orange-500 text-white p-3 rounded-xl font-bold hover:shadow-lg transition"
            >
              Apply Filters
            </button>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex-1 bg-gray-200 text-gray-700 p-3 rounded-xl font-bold hover:bg-gray-300 transition"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      )}

      <h3 className="text-2xl font-bold mb-4 text-gray-800">Upcoming Events</h3>
      {filteredEvents.length === 0 && (
        <p className="text-gray-500 text-center py-8">No events found</p>
      )}
      <div className="space-y-3">
        {filteredEvents.map(event => {
          const attendeeProfiles = event.attendees.slice(0, 4).map(id => users.find(u => u.id === id));
          const remainingCount = event.attendees.length - 4;
          
          return (
            <div
              key={event.id}
              onClick={() => {
                onSelectEvent(event);
                onNavigate('eventDetail');
              }}
              className="bg-white border-2 border-gray-100 rounded-2xl p-4 cursor-pointer hover:shadow-xl hover:border-purple-200 transition-all transform hover:-translate-y-1"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1 pr-2">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h4 className="font-bold text-lg text-gray-900 leading-tight">{event.title}</h4>
                    {event.applicants.some(a => a.userId === currentUser.id) && !event.attendees.includes(currentUser.id) && (
                      <span className="inline-flex items-center gap-1 text-xs bg-amber-100 text-amber-700 border border-amber-300 px-2 py-0.5 rounded-full font-semibold flex-shrink-0">
                        <Check size={11} />
                        Applied
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-purple-600 font-bold">{event.gameName}</p>
                </div>
                <div className="flex items-start gap-1 text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded-lg">
                  <MapPin size={14} className="text-pink-500 flex-shrink-0 mt-0.5" />
                  <span className="font-medium">{event.city}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                <Calendar size={16} className="text-orange-500" />
                <span className="font-medium">{event.date.split('-').reverse().join('/')} • {event.time}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5 text-sm text-gray-700">
                    <Users size={16} className="text-purple-500" />
                    <span className="font-bold">{event.attendees.length}/{event.maxPlayers}</span>
                  </div>
                  {event.experience && (
                    <span className="text-xs bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-3 py-1 rounded-full font-bold">
                      {Array.isArray(event.experience) ? event.experience.map(exp => exp.charAt(0).toUpperCase() + exp.slice(1)).join(', ') : event.experience.charAt(0).toUpperCase() + event.experience.slice(1)}
                    </span>
                  )}
                </div>
                <div className="flex items-center -space-x-2">
                  {attendeeProfiles.map(attendee => (
                    attendee && (
                      attendee.image ? (
                        <img 
                          key={attendee.id}
                          src={attendee.image} 
                          alt={attendee.nickname} 
                          className="w-7 h-7 rounded-full border-2 border-white object-cover"
                        />
                      ) : (
                        <div 
                          key={attendee.id}
                          className="w-7 h-7 rounded-full border-2 border-white bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-xs font-bold"
                        >
                          {attendee.firstName?.charAt(0)}
                        </div>
                      )
                    )
                  ))}
                  {remainingCount > 0 && (
                    <div className="w-7 h-7 rounded-full border-2 border-white bg-gray-300 flex items-center justify-center text-gray-700 text-xs font-bold">
                      +{remainingCount}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const EventDetailScreen = ({ event: initialEvent, onBack, onNavigate }) => {
  const { currentUser, events, setEvents, users, notifications, setNotifications, reviews } = useContext(AppContext);
  const event = events.find(e => e.id === initialEvent.id) || initialEvent;
  const host = users.find(u => u.id === event.hostId);
  const hostName = host?.nickname || host?.firstName || 'Unknown';
  const isHost = currentUser.id === event.hostId;
  const isAttendee = event.attendees.includes(currentUser.id);
  const hasApplied = event.applicants.some(a => a.userId === currentUser.id);
  const isPast = new Date(event.date) < new Date();
  const isFull = event.attendees.length >= event.maxPlayers;
  const [applicationMessage, setApplicationMessage] = useState('');
  const [showApplicationForm, setShowApplicationForm] = useState(false);

  const calculateAverageRating = (userId) => {
    const userReviews = reviews[userId] || [];
    if (userReviews.length === 0) return 0;
    const sum = userReviews.reduce((acc, review) => acc + review.rating, 0);
    return Math.round(sum / userReviews.length);
  };

  const attendeeProfiles = event.attendees.map(userId => {
    const user = users.find(u => u.id === userId);
    return {
      ...user,
      rating: calculateAverageRating(userId),
      reviewCount: (reviews[userId] || []).length
    };
  });

  const hostProfile = attendeeProfiles.find(p => p.id === event.hostId);

  const handleApply = () => {
    setShowApplicationForm(true);
  };

  const submitApplication = () => {
    const updatedEvents = events.map(e => {
      if (e.id === event.id) {
        return {
          ...e,
          applicants: [...e.applicants, { userId: currentUser.id, status: 'pending', message: applicationMessage }]
        };
      }
      return e;
    });
    setEvents(updatedEvents);

    // Notify the host
    setNotifications(prev => ({
      ...prev,
      [event.hostId]: [
        ...(prev[event.hostId] || []),
        {
          id: Date.now().toString(),
          message: `${currentUser.nickname || currentUser.firstName} has applied to join "${event.title}"! Check your applicants.`,
          type: 'info',
          read: false,
          timestamp: new Date(),
          eventId: event.id,
          destination: 'manageApplicants'
        }
      ]
    }));

    setShowApplicationForm(false);
    setApplicationMessage('');
    alert('Application submitted!');
  };

  const handleLeave = () => {
    const updatedEvents = events.map(e => {
      if (e.id === event.id) {
        return {
          ...e,
          attendees: e.attendees.filter(id => id !== currentUser.id)
        };
      }
      return e;
    });
    setEvents(updatedEvents);

    // Notify the host
    setNotifications(prev => ({
      ...prev,
      [event.hostId]: [
        ...(prev[event.hostId] || []),
        {
          id: Date.now().toString(),
          message: `${currentUser.nickname || currentUser.firstName} has dropped out of "${event.title}". The event is now open for new applicants.`,
          type: 'error',
          read: false,
          timestamp: new Date(),
          eventId: event.id
        }
      ]
    }));

    alert('You have left the event. The host has been notified.');
    onBack();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4">
        <div className="bg-white rounded-lg shadow p-6 mb-4">
          {isFull && isHost && (
            <div className="bg-green-50 border-2 border-green-400 rounded-lg p-4 mb-4 text-center">
              <p className="text-green-800 font-bold text-lg">🎲 You're all set for an epic game party! 🎉</p>
            </div>
          )}
          
          <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
          <p className="text-lg text-blue-600 mb-4">{event.gameName}</p>
          <p className="text-gray-700 mb-4">{event.description}</p>

          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar size={20} />
              <span>{event.date.split('-').reverse().join('/')} at {event.time}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin size={20} />
              <span>{event.location}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Users size={20} />
              <span>{event.attendees.length}/{event.maxPlayers} players confirmed</span>
            </div>
          </div>

          <p className="text-sm text-gray-500 mb-4">Hosted by {hostName}</p>

          <div className="mb-6">
            <h4 className="font-bold text-lg mb-3">Players Attending ({event.attendees.length}/{event.maxPlayers})</h4>
            <div className="space-y-3">
              {attendeeProfiles.map(participant => (
                <div key={participant.id} className="bg-gray-50 p-4 rounded-lg border">
                  <div className="flex items-start gap-3">
                    {participant.image ? (
                      <img src={participant.image} alt={participant.nickname} className="w-16 h-16 rounded-full object-cover flex-shrink-0" />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-blue-200 flex items-center justify-center flex-shrink-0">
                        <User size={32} className="text-blue-600" />
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold">{participant.firstName}</p>
                        {participant.id === event.hostId && (
                          <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded">Host</span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">@{participant.nickname}</p>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map(card => (
                            <span key={card} className={`text-lg ${participant.rating >= card ? 'text-red-500' : 'text-gray-300'}`}>
                              ♠
                            </span>
                          ))}
                        </div>
                        {participant.reviewCount > 0 && (
                          <span className="text-sm text-gray-600">({participant.reviewCount} {participant.reviewCount === 1 ? 'review' : 'reviews'})</span>
                        )}
                      </div>
                      {participant.bio && (
                        <p className="text-sm text-gray-700">{participant.bio}</p>
                      )}
                      {!participant.bio && (
                        <p className="text-sm text-gray-500 italic">No bio yet</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {isHost && (
            <button
              onClick={() => onNavigate('manageApplicants')}
              className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold mb-2"
            >
              Manage Applicants ({event.applicants.filter(a => a.status !== 'rejected').length})
            </button>
          )}

          {isAttendee && (
            <button
              onClick={() => onNavigate('chat')}
              className="w-full bg-gradient-to-r from-purple-600 to-orange-500 text-white p-3 rounded-lg font-semibold mb-2 flex items-center justify-center gap-2 hover:shadow-lg transition"
            >
              <MessageCircle size={20} />
              Event Chat
            </button>
          )}

          {!isHost && !isAttendee && !hasApplied && (
            <>
              {!showApplicationForm ? (
                <button
                  onClick={handleApply}
                  className="w-full bg-gradient-to-r from-purple-600 to-orange-500 text-white p-3 rounded-lg font-semibold hover:shadow-lg transition"
                  disabled={event.attendees.length >= event.maxPlayers}
                >
                  {event.attendees.length >= event.maxPlayers ? 'Event Full' : 'Apply to Join'}
                </button>
              ) : (
                <div className="space-y-3">
                  <textarea
                    placeholder="Introduce yourself (optional)..."
                    value={applicationMessage}
                    onChange={(e) => setApplicationMessage(e.target.value)}
                    className="w-full p-3 border rounded-lg"
                    rows="3"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={submitApplication}
                      className="flex-1 bg-gradient-to-r from-purple-600 to-orange-500 text-white p-3 rounded-lg font-semibold hover:shadow-lg transition"
                    >
                      Submit
                    </button>
                    <button
                      onClick={() => {
                        setShowApplicationForm(false);
                        setApplicationMessage('');
                      }}
                      className="flex-1 bg-gray-300 text-gray-700 p-3 rounded-lg font-semibold"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

          {!isHost && hasApplied && !isAttendee && (
            <div className="w-full bg-gradient-to-r from-purple-50 to-orange-50 border-2 border-purple-200 rounded-lg p-4 flex items-center justify-center gap-2">
              <Clock size={18} className="text-purple-500 flex-shrink-0" />
              <div>
                <p className="font-semibold text-purple-700 text-sm">Application Submitted</p>
                <p className="text-purple-500 text-xs">Waiting for the host to review your application</p>
              </div>
            </div>
          )}

          {!isHost && isAttendee && !isPast && (
            <button
              onClick={handleLeave}
              className="w-full bg-red-600 text-white p-3 rounded-lg font-semibold"
            >
              Leave Event
            </button>
          )}

          {!isHost && isAttendee && isPast && (
            <button
              onClick={() => onNavigate('reviewEvent')}
              className="w-full bg-purple-600 text-white p-3 rounded-lg font-semibold"
            >
              Review Event
            </button>
          )}
        </div>
      </div>
    </>
  );
};

const CreateEventScreen = ({ onBack }) => {
  // Get next full hour in 24-hour format (HH:00)
  const getNextFullHour = () => {
    const now = new Date();
    const nextHour = now.getHours() + 1;
    const hours = String(nextHour > 23 ? 0 : nextHour).padStart(2, '0');
    return `${hours}:00`;
  };

  // Form state
  const [title, setTitle] = useState('');
  const [gameName, setGameName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState(getNextFullHour());
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [maxPlayers, setMaxPlayers] = useState(4);
  const [currentPlayers, setCurrentPlayers] = useState(1);
  const [experience, setExperience] = useState([]);
  const [errors, setErrors] = useState({});
  const [dateError, setDateError] = useState('');
  const [timeError, setTimeError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const { currentUser, events, setEvents } = useContext(AppContext);

  const handleDateChange = (e) => {
    const inputValue = e.target.value;
    setDate(inputValue);
    
    // Only validate if the date is complete (has all 10 characters: YYYY-MM-DD)
    if (inputValue.length === 10) {
      const selectedDate = new Date(inputValue);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        setDateError('Please select a future date');
      } else {
        setDateError('');
      }
    } else {
      // Clear error while typing
      setDateError('');
    }
  };

  const handleTimeChange = (newTime) => {
    setTime(newTime);
    
    if (date) {
      const selectedDateTime = new Date(`${date}T${newTime}`);
      const now = new Date();
      if (selectedDateTime < now) {
        setTimeError('Event time must be in the future');
      } else {
        setTimeError('');
      }
    }
  };

  const handleSubmit = () => {
    // Reset errors
    const newErrors = {};
    
    // Validate all fields
    if (!title) newErrors.title = true;
    if (!gameName) newErrors.gameName = true;
    if (!description) newErrors.description = true;
    if (!date) newErrors.date = true;
    if (!time) newErrors.time = true;
    if (!city) newErrors.city = true;
    if (!country) newErrors.country = true;
    if (!experience || experience.length === 0) newErrors.experience = true;
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      alert('Please fill in all required fields');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    if (currentPlayers >= maxPlayers) {
      alert('Current players must be less than max players');
      return;
    }
    
    const selectedDateTime = new Date(`${date}T${time}`);
    const now = new Date();
    if (selectedDateTime < now) {
      alert('Cannot create event in the past. Please select a future date and time.');
      return;
    }
    
    const location = `${city}, ${country}`;
    const newEvent = {
      id: Date.now().toString(),
      title,
      description,
      gameName,
      date,
      time,
      location,
      city,
      country,
      maxPlayers: parseInt(maxPlayers),
      currentPlayers: parseInt(currentPlayers),
      experience,
      hostId: currentUser.id,
      applicants: [],
      attendees: [currentUser.id],
      status: 'upcoming'
    };
    
    setEvents([...events, newEvent]);
    setShowSuccess(true);
  };

  const getExperienceBadge = (level) => {
    const badges = {
      beginner: { color: 'bg-purple-100 text-purple-600 border-purple-200', label: 'Beginner' },
      intermediate: { color: 'bg-purple-300 text-purple-700 border-purple-400', label: 'Intermediate' },
      master: { color: 'bg-purple-500 text-white border-purple-600', label: 'Master' }
    };
    return badges[level] || badges.beginner;
  };

  if (showSuccess) {
    // Auto-redirect to home after 2 seconds
    setTimeout(() => {
      onBack();
    }, 2000);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex flex-col items-center justify-center p-4">
        <div className="text-center">
          <div className="text-8xl mb-6 animate-bounce">🎉</div>
          <h2 className="text-4xl font-bold text-gray-800 mb-3">Event Created!</h2>
          <p className="text-xl text-gray-600">Your board game event is ready!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 pb-8">
      <div className="max-w-3xl mx-auto px-4 py-6">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Create New Event</h1>
          <p className="text-gray-600">Fill in the details to host your next board game session!</p>
        </div>

        {/* Game Information Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-2 border-purple-100">
          <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-100">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl flex items-center justify-center">
              <Dices size={20} className="text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Game Information</h2>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-bold mb-2 text-gray-800">
                Event Title <span className="text-orange-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setErrors({...errors, title: false});
                }}
                placeholder="e.g., Epic Catan Night, Strategy Sunday..."
                className={`w-full p-4 border-2 rounded-xl focus:ring-4 focus:ring-orange-200 focus:border-orange-400 transition-all outline-none ${
                  errors.title ? 'border-red-400 bg-red-50' : 'border-gray-200'
                }`}
              />
              {errors.title && (
                <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                  <span className="font-bold">!</span> This field is required
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-bold mb-2 text-gray-800">
                Board Game Name <span className="text-orange-500">*</span>
              </label>
              <input
                type="text"
                value={gameName}
                onChange={(e) => {
                  setGameName(e.target.value);
                  setErrors({...errors, gameName: false});
                }}
                placeholder="e.g., Settlers of Catan, Ticket to Ride..."
                className={`w-full p-4 border-2 rounded-xl focus:ring-4 focus:ring-orange-200 focus:border-orange-400 transition-all outline-none ${
                  errors.gameName ? 'border-red-400 bg-red-50' : 'border-gray-200'
                }`}
              />
              {errors.gameName && (
                <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                  <span className="font-bold">!</span> This field is required
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-bold mb-2 text-gray-800">
                Description <span className="text-orange-500">*</span>
              </label>
              <textarea
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  setErrors({...errors, description: false});
                }}
                placeholder="Share details about your game session! Will you provide snacks? What's the vibe?"
                rows="4"
                className={`w-full p-4 border-2 rounded-xl focus:ring-4 focus:ring-orange-200 focus:border-orange-400 transition-all resize-none outline-none ${
                  errors.description ? 'border-red-400 bg-red-50' : 'border-gray-200'
                }`}
              />
              <div className="flex justify-between items-center mt-2">
                {errors.description ? (
                  <p className="text-red-500 text-xs flex items-center gap-1">
                    <span className="font-bold">!</span> This field is required
                  </p>
                ) : (
                  <p className="text-gray-400 text-xs">
                    {description.length}/500 characters
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Date & Location Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-2 border-purple-100">
          <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-100">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-pink-400 rounded-xl flex items-center justify-center">
              <Calendar size={20} className="text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">When & Where</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-bold mb-2 text-gray-800">
                <Calendar className="inline mr-2" size={16} />
                Date <span className="text-orange-500">*</span>
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => {
                  handleDateChange(e);
                  setErrors({...errors, date: false});
                }}
                min={new Date().toISOString().split('T')[0]}
                className={`w-full p-4 border-2 rounded-xl focus:ring-4 focus:ring-orange-200 focus:border-orange-400 transition-all outline-none ${
                  dateError || errors.date ? 'border-red-400 bg-red-50' : 'border-gray-200'
                }`}
              />
              {(dateError || errors.date) && (
                <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                  <span className="font-bold">!</span> {dateError || 'This field is required'}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-bold mb-2 text-gray-800">
                <Clock className="inline mr-2" size={16} />
                Time <span className="text-orange-500">*</span>
              </label>
              <input
                type="time"
                value={time}
                onChange={(e) => {
                  handleTimeChange(e.target.value);
                  setErrors({...errors, time: false});
                }}
                className={`w-full p-4 border-2 rounded-xl focus:ring-4 focus:ring-orange-200 focus:border-orange-400 transition-all outline-none ${
                  timeError || errors.time ? 'border-red-400 bg-red-50' : 'border-gray-200'
                }`}
                step="900"
              />
              {(timeError || errors.time) && (
                <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                  <span className="font-bold">!</span> {timeError || 'This field is required'}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-bold mb-2 text-gray-800">
                Country <span className="text-orange-500">*</span>
              </label>
              <input
                type="text"
                list="countries"
                value={country}
                onChange={(e) => {
                  setCountry(e.target.value);
                  setErrors({...errors, country: false});
                }}
                placeholder="Search or select country..."
                className={`w-full p-4 border-2 rounded-xl focus:ring-4 focus:ring-orange-200 focus:border-orange-400 transition-all outline-none ${
                  errors.country ? 'border-red-400 bg-red-50' : 'border-gray-200'
                }`}
              />
              <datalist id="countries">
                <option value="Afghanistan" />
                <option value="Albania" />
                <option value="Algeria" />
                <option value="Andorra" />
                <option value="Angola" />
                <option value="Argentina" />
                <option value="Armenia" />
                <option value="Australia" />
                <option value="Austria" />
                <option value="Azerbaijan" />
                <option value="Bahamas" />
                <option value="Bahrain" />
                <option value="Bangladesh" />
                <option value="Barbados" />
                <option value="Belarus" />
                <option value="Belgium" />
                <option value="Belize" />
                <option value="Benin" />
                <option value="Bhutan" />
                <option value="Bolivia" />
                <option value="Bosnia and Herzegovina" />
                <option value="Botswana" />
                <option value="Brazil" />
                <option value="Brunei" />
                <option value="Bulgaria" />
                <option value="Burkina Faso" />
                <option value="Burundi" />
                <option value="Cambodia" />
                <option value="Cameroon" />
                <option value="Canada" />
                <option value="Cape Verde" />
                <option value="Central African Republic" />
                <option value="Chad" />
                <option value="Chile" />
                <option value="China" />
                <option value="Colombia" />
                <option value="Comoros" />
                <option value="Congo" />
                <option value="Costa Rica" />
                <option value="Croatia" />
                <option value="Cuba" />
                <option value="Cyprus" />
                <option value="Czech Republic" />
                <option value="Denmark" />
                <option value="Djibouti" />
                <option value="Dominica" />
                <option value="Dominican Republic" />
                <option value="East Timor" />
                <option value="Ecuador" />
                <option value="Egypt" />
                <option value="El Salvador" />
                <option value="Equatorial Guinea" />
                <option value="Eritrea" />
                <option value="Estonia" />
                <option value="Ethiopia" />
                <option value="Fiji" />
                <option value="Finland" />
                <option value="France" />
                <option value="Gabon" />
                <option value="Gambia" />
                <option value="Georgia" />
                <option value="Germany" />
                <option value="Ghana" />
                <option value="Greece" />
                <option value="Grenada" />
                <option value="Guatemala" />
                <option value="Guinea" />
                <option value="Guinea-Bissau" />
                <option value="Guyana" />
                <option value="Haiti" />
                <option value="Honduras" />
                <option value="Hungary" />
                <option value="Iceland" />
                <option value="India" />
                <option value="Indonesia" />
                <option value="Iran" />
                <option value="Iraq" />
                <option value="Ireland" />
                <option value="Israel" />
                <option value="Italy" />
                <option value="Ivory Coast" />
                <option value="Jamaica" />
                <option value="Japan" />
                <option value="Jordan" />
                <option value="Kazakhstan" />
                <option value="Kenya" />
                <option value="Kiribati" />
                <option value="Kuwait" />
                <option value="Kyrgyzstan" />
                <option value="Laos" />
                <option value="Latvia" />
                <option value="Lebanon" />
                <option value="Lesotho" />
                <option value="Liberia" />
                <option value="Libya" />
                <option value="Liechtenstein" />
                <option value="Lithuania" />
                <option value="Luxembourg" />
                <option value="Madagascar" />
                <option value="Malawi" />
                <option value="Malaysia" />
                <option value="Maldives" />
                <option value="Mali" />
                <option value="Malta" />
                <option value="Marshall Islands" />
                <option value="Mauritania" />
                <option value="Mauritius" />
                <option value="Mexico" />
                <option value="Micronesia" />
                <option value="Moldova" />
                <option value="Monaco" />
                <option value="Mongolia" />
                <option value="Montenegro" />
                <option value="Morocco" />
                <option value="Mozambique" />
                <option value="Myanmar" />
                <option value="Namibia" />
                <option value="Nauru" />
                <option value="Nepal" />
                <option value="Netherlands" />
                <option value="New Zealand" />
                <option value="Nicaragua" />
                <option value="Niger" />
                <option value="Nigeria" />
                <option value="North Korea" />
                <option value="North Macedonia" />
                <option value="Norway" />
                <option value="Oman" />
                <option value="Pakistan" />
                <option value="Palau" />
                <option value="Palestine" />
                <option value="Panama" />
                <option value="Papua New Guinea" />
                <option value="Paraguay" />
                <option value="Peru" />
                <option value="Philippines" />
                <option value="Poland" />
                <option value="Portugal" />
                <option value="Qatar" />
                <option value="Romania" />
                <option value="Russia" />
                <option value="Rwanda" />
                <option value="Saint Kitts and Nevis" />
                <option value="Saint Lucia" />
                <option value="Saint Vincent and the Grenadines" />
                <option value="Samoa" />
                <option value="San Marino" />
                <option value="Sao Tome and Principe" />
                <option value="Saudi Arabia" />
                <option value="Senegal" />
                <option value="Serbia" />
                <option value="Seychelles" />
                <option value="Sierra Leone" />
                <option value="Singapore" />
                <option value="Slovakia" />
                <option value="Slovenia" />
                <option value="Solomon Islands" />
                <option value="Somalia" />
                <option value="South Africa" />
                <option value="South Korea" />
                <option value="South Sudan" />
                <option value="Spain" />
                <option value="Sri Lanka" />
                <option value="Sudan" />
                <option value="Suriname" />
                <option value="Sweden" />
                <option value="Switzerland" />
                <option value="Syria" />
                <option value="Taiwan" />
                <option value="Tajikistan" />
                <option value="Tanzania" />
                <option value="Thailand" />
                <option value="Togo" />
                <option value="Tonga" />
                <option value="Trinidad and Tobago" />
                <option value="Tunisia" />
                <option value="Turkey" />
                <option value="Turkmenistan" />
                <option value="Tuvalu" />
                <option value="Uganda" />
                <option value="Ukraine" />
                <option value="United Arab Emirates" />
                <option value="United Kingdom" />
                <option value="United States" />
                <option value="Uruguay" />
                <option value="Uzbekistan" />
                <option value="Vanuatu" />
                <option value="Vatican City" />
                <option value="Venezuela" />
                <option value="Vietnam" />
                <option value="Yemen" />
                <option value="Zambia" />
                <option value="Zimbabwe" />
              </datalist>
              {errors.country && (
                <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                  <span className="font-bold">!</span> This field is required
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-bold mb-2 text-gray-800">
                <MapPin className="inline mr-2" size={16} />
                City <span className="text-orange-500">*</span>
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                  setErrors({...errors, city: false});
                }}
                placeholder="e.g., Singapore"
                className={`w-full p-4 border-2 rounded-xl focus:ring-4 focus:ring-orange-200 focus:border-orange-400 transition-all outline-none ${
                  errors.city ? 'border-red-400 bg-red-50' : 'border-gray-200'
                }`}
              />
              {errors.city && (
                <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                  <span className="font-bold">!</span> This field is required
                </p>
              )}
            </div>
          </div>
          
          <div className="bg-blue-50 rounded-xl p-3 border border-blue-200 mt-4">
            <p className="text-xs text-blue-700 text-center">
              💬 You'll share the exact meeting location in the private chat with participants
            </p>
          </div>
        </div>

        {/* Players Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-2 border-purple-100">
          <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-100">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-400 rounded-xl flex items-center justify-center">
              <Users size={20} className="text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Players</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-bold mb-2 text-gray-800">
                Total Players <span className="text-orange-500">*</span>
              </label>
              
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setMaxPlayers(Math.max(2, maxPlayers - 1))}
                  className="w-10 h-10 rounded-lg bg-orange-100 hover:bg-orange-200 text-orange-600 font-bold text-lg transition-all hover:scale-110"
                >
                  -
                </button>
                
                <div className="flex-1 text-center">
                  <div className="text-3xl font-bold text-gray-800">{maxPlayers}</div>
                </div>
                
                <button
                  type="button"
                  onClick={() => setMaxPlayers(Math.min(10, maxPlayers + 1))}
                  className="w-10 h-10 rounded-lg bg-orange-100 hover:bg-orange-200 text-orange-600 font-bold text-lg transition-all hover:scale-110"
                >
                  +
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2 text-gray-800">
                Players Needed <span className="text-orange-500">*</span>
              </label>
              
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setCurrentPlayers(Math.max(1, currentPlayers - 1))}
                  className="w-10 h-10 rounded-lg bg-purple-100 hover:bg-purple-200 text-purple-600 font-bold text-lg transition-all hover:scale-110"
                >
                  -
                </button>
                
                <div className="flex-1 text-center">
                  <div className="text-3xl font-bold text-gray-800">{currentPlayers}</div>
                </div>
                
                <button
                  type="button"
                  onClick={() => setCurrentPlayers(Math.min(maxPlayers, currentPlayers + 1))}
                  className="w-10 h-10 rounded-lg bg-purple-100 hover:bg-purple-200 text-purple-600 font-bold text-lg transition-all hover:scale-110"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Experience Level Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-2 border-purple-100">
          <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-100">
            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-400 rounded-xl flex items-center justify-center">
              <Award size={20} className="text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Experience Level</h2>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { level: 'beginner', label: 'Beginner', desc: 'New to the game' },
              { level: 'intermediate', label: 'Intermediate', desc: 'Know the basics' },
              { level: 'master', label: 'Master', desc: 'Expert player' }
            ].map(({ level, label, desc }) => {
              const badge = getExperienceBadge(level);
              const isSelected = experience.includes(level);
              
              return (
                <button
                  key={level}
                  type="button"
                  onClick={() => {
                    if (isSelected) {
                      setExperience(experience.filter(e => e !== level));
                    } else {
                      setExperience([...experience, level]);
                    }
                    setErrors({...errors, experience: false});
                  }}
                  className={`p-4 rounded-xl border-2 transition-all transform hover:scale-105 ${
                    isSelected 
                      ? `${badge.color} border-current shadow-lg scale-105` 
                      : 'bg-white border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-center">
                    <p className={`font-bold text-sm mb-0.5 ${isSelected ? '' : 'text-gray-800'}`}>
                      {label}
                    </p>
                    <p className={`text-xs ${isSelected ? 'opacity-80' : 'text-gray-500'}`}>
                      {desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
          
          {errors.experience && (
            <p className="text-red-500 text-xs mt-3 flex items-center gap-1">
              <span className="font-bold">!</span> Please select at least one experience level
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-5 px-6 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all flex items-center justify-center gap-3 hover:scale-105 transform"
        >
          Create Event
        </button>
      </div>
    </div>
  );
};

const MyEventsScreen = ({ onNavigate, onSelectEvent }) => {
  const { currentUser, events, users } = useContext(AppContext);
  const myHostedEvents = events.filter(e => e.hostId === currentUser.id);
  const myAttendingEvents = events.filter(e => 
    e.attendees.includes(currentUser.id) && e.hostId !== currentUser.id
  );
  const myAppliedEvents = events.filter(e =>
    e.applicants.some(a => a.userId === currentUser.id && a.status !== 'rejected') &&
    !e.attendees.includes(currentUser.id) &&
    e.hostId !== currentUser.id
  );

  const AvatarStack = ({ eventAttendees }) => {
    const profiles = eventAttendees.slice(0, 4).map(id => users.find(u => u.id === id));
    const remaining = eventAttendees.length - 4;
    return (
      <div className="flex items-center -space-x-2">
        {profiles.map(attendee => attendee && (
          attendee.image ? (
            <img key={attendee.id} src={attendee.image} alt={attendee.nickname} className="w-7 h-7 rounded-full border-2 border-white object-cover" />
          ) : (
            <div key={attendee.id} className="w-7 h-7 rounded-full border-2 border-white bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-xs font-bold">
              {attendee.firstName?.charAt(0)}
            </div>
          )
        ))}
        {remaining > 0 && (
          <div className="w-7 h-7 rounded-full border-2 border-white bg-gray-300 flex items-center justify-center text-gray-700 text-xs font-bold">+{remaining}</div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4">

        {/* Hosting */}
        <h3 className="text-lg font-bold mb-3 text-gray-800">Events I'm Hosting</h3>
        <div className="space-y-3 mb-6">
          {myHostedEvents.map(event => (
            <div key={event.id} onClick={() => { onSelectEvent(event); onNavigate('eventDetail'); }}
              className="bg-white border-2 border-gray-100 rounded-2xl p-4 cursor-pointer hover:shadow-lg transition">
              <h4 className="font-bold text-lg text-gray-900">{event.title}</h4>
              <p className="text-sm text-purple-600 font-bold">{event.gameName}</p>
              <p className="text-sm text-gray-500 font-medium">{event.date.split('-').reverse().join('/')} at {event.time}</p>
              <div className="flex items-center justify-between mt-3">
                <p className="text-sm text-purple-600 font-bold">
                  {event.applicants.length} pending {event.applicants.length === 1 ? 'application' : 'applications'}
                </p>
                <AvatarStack eventAttendees={event.attendees} />
              </div>
            </div>
          ))}
          {myHostedEvents.length === 0 && (
            <p className="text-gray-500 text-center py-8 text-base">No hosted events yet</p>
          )}
        </div>

        {/* Attending */}
        <h3 className="text-lg font-bold mb-3 text-gray-800">Events I'm Attending</h3>
        <div className="space-y-3 mb-6">
          {myAttendingEvents.map(event => (
            <div key={event.id} onClick={() => { onSelectEvent(event); onNavigate('eventDetail'); }}
              className="bg-white border-2 border-gray-100 rounded-2xl p-4 cursor-pointer hover:shadow-lg transition">
              <h4 className="font-bold text-lg text-gray-900">{event.title}</h4>
              <p className="text-sm text-purple-600 font-bold">{event.gameName}</p>
              <p className="text-sm text-gray-500 font-medium">{event.date.split('-').reverse().join('/')} at {event.time}</p>
              <div className="flex items-center justify-end mt-2">
                <AvatarStack eventAttendees={event.attendees} />
              </div>
            </div>
          ))}
          {myAttendingEvents.length === 0 && (
            <p className="text-gray-500 text-center py-8 text-base">Not attending any events yet</p>
          )}
        </div>

        {/* Applied */}
        <h3 className="text-lg font-bold mb-3 text-gray-800">Applied — Awaiting Response</h3>
        <div className="space-y-3">
          {myAppliedEvents.map(event => {
            const host = users.find(u => u.id === event.hostId);
            return (
              <div key={event.id} onClick={() => { onSelectEvent(event); onNavigate('eventDetail'); }}
                className="bg-white border-2 border-amber-200 rounded-2xl p-4 cursor-pointer hover:shadow-lg transition">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h4 className="font-bold text-lg text-gray-900">{event.title}</h4>
                  <span className="inline-flex items-center gap-1 text-xs bg-amber-100 text-amber-700 border border-amber-300 px-2 py-0.5 rounded-full font-semibold flex-shrink-0 mt-1">
                    <Clock size={11} />
                    Pending
                  </span>
                </div>
                <p className="text-sm text-purple-600 font-bold">{event.gameName}</p>
                <p className="text-sm text-gray-500 font-medium">{event.date.split('-').reverse().join('/')} at {event.time}</p>
                <div className="flex items-center justify-between mt-3">
                  <p className="text-sm text-gray-500">
                    Hosted by <span className="font-semibold text-gray-700">{host?.nickname || host?.firstName}</span>
                  </p>
                  <p className="text-sm text-gray-500 font-medium">
                    {event.attendees.length}/{event.maxPlayers} players
                  </p>
                </div>
              </div>
            );
          })}
          {myAppliedEvents.length === 0 && (
            <p className="text-gray-500 text-center py-8 text-base">No pending applications</p>
          )}
        </div>

      </div>
    </div>
  );
};

const ManageApplicantsScreen = ({ event: initialEvent, onBack, onEventFull, setBackHandler }) => {
  const { events, setEvents, users, notifications, setNotifications, reviews, chats, setChats } = useContext(AppContext);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  
  // Get fresh event data from state
  const event = events.find(e => e.id === initialEvent.id) || initialEvent;

  // Set custom back handler when viewing applicant details
  React.useEffect(() => {
    if (selectedApplicant && setBackHandler) {
      setBackHandler(() => () => setSelectedApplicant(null));
    } else if (setBackHandler) {
      setBackHandler(null);
    }
    
    return () => {
      if (setBackHandler) setBackHandler(null);
    };
  }, [selectedApplicant, setBackHandler]);

  const addNotification = (userId, message, type, eventId = null) => {
    setNotifications(prev => ({
      ...prev,
      [userId]: [
        ...(prev[userId] || []),
        { id: Date.now().toString(), message, type, read: false, timestamp: new Date(), eventId }
      ]
    }));
  };

  const createWelcomeMessage = (eventId, hostId, attendeeIds) => {
    const host = users.find(u => u.id === hostId);
    const attendees = attendeeIds.map(id => users.find(u => u.id === id));
    const participantMentions = attendees.map(a => `@${a?.nickname}`).join(', ');
    
    const welcomeMessage = {
      id: Date.now().toString(),
      userId: 'system',
      message: `Hey ${participantMentions}! You've assembled an amazing group for ${event.gameName}. @${host?.nickname}, please share the exact location and any other details (parking, what to bring, etc.) when you're ready. 🎲`,
      timestamp: new Date(),
      isSystem: true
    };
    
    setChats(prev => ({
      ...prev,
      [eventId]: [welcomeMessage]
    }));
    
    // Send special notification to host
    addNotification(
      hostId, 
      `Event chat for "${event.title}" is now open! Provide more details on this event, such as exact location, etc.`, 
      'info', 
      eventId
    );
    
    // Send notification to other attendees about the chat being ready
    attendeeIds.forEach(userId => {
      if (userId !== hostId) {
        addNotification(userId, `Event chat for "${event.title}" is now open! Check it out.`, 'info', eventId);
      }
    });
  };

  const calculateAverageRating = (userId) => {
    const userReviews = reviews[userId] || [];
    if (userReviews.length === 0) return 0;
    const sum = userReviews.reduce((acc, review) => acc + review.rating, 0);
    return Math.round(sum / userReviews.length);
  };

  const handleApplicant = (applicantId, action) => {
    const applicantUser = users.find(u => u.id === applicantId);
    const applicantNickname = applicantUser?.nickname || applicantUser?.firstName || 'there';
    
    if (action === 'accept') {
      addNotification(
        applicantId, 
        `Great news! Your application to "${event.title}" has been accepted! We're excited to play together. See you there! 🎲`, 
        'success',
        event.id
      );
    } else {
      addNotification(
        applicantId, 
        `The event "${event.title}" is already full. Apply for other game parties, don't give up ${applicantNickname}!`, 
        'error'
      );
    }

    let updatedEvent = null;
    const updatedEvents = events.map(e => {
      if (e.id === event.id) {
        if (action === 'accept') {
          const newAttendees = [...e.attendees, applicantId];
          const isFull = newAttendees.length >= e.maxPlayers;

          // Open chat on first acceptance if not already open
          const chatAlreadyExists = chats[event.id] && chats[event.id].length > 0;
          if (!chatAlreadyExists) {
            createWelcomeMessage(event.id, event.hostId, newAttendees);
          } else {
            // Add a system message announcing the new player
            const newPlayer = users.find(u => u.id === applicantId);
            setChats(prev => ({
              ...prev,
              [event.id]: [
                ...(prev[event.id] || []),
                {
                  id: Date.now().toString(),
                  userId: 'system',
                  message: `@${newPlayer?.nickname} has joined the event! Welcome! 🎲`,
                  timestamp: new Date(),
                  isSystem: true
                }
              ]
            }));
          }

          // Notify all current attendees if event becomes full
          if (isFull) {
            newAttendees.forEach(attendeeId => {
              addNotification(
                attendeeId,
                `"${event.title}" is now full! Get ready for an amazing game night on ${event.date.split('-').reverse().join('/')} at ${event.time}! 🎲`,
                'success',
                event.id
              );
            });
          }

          updatedEvent = {
            ...e,
            applicants: e.applicants.filter(a => a.userId !== applicantId),
            attendees: newAttendees
          };
          return updatedEvent;
        } else {
          return {
            ...e,
            applicants: e.applicants.map(a => 
              a.userId === applicantId ? { ...a, status: 'rejected' } : a
            )
          };
        }
      }
      return e;
    });
    
    setEvents(updatedEvents);
    setSelectedApplicant(null);

    if (updatedEvent && updatedEvent.attendees.length >= updatedEvent.maxPlayers) {
      onEventFull(updatedEvent);
    }
  };

  const handleRemove = (attendeeId) => {
    const attendeeUser = users.find(u => u.id === attendeeId);
    const attendeeNickname = attendeeUser?.nickname || attendeeUser?.firstName || 'there';

    const updatedEvents = events.map(e => {
      if (e.id === event.id) {
        return { ...e, attendees: e.attendees.filter(id => id !== attendeeId) };
      }
      return e;
    });
    setEvents(updatedEvents);

    // Post system message in chat
    setChats(prev => ({
      ...prev,
      [event.id]: [
        ...(prev[event.id] || []),
        {
          id: Date.now().toString(),
          userId: 'system',
          message: `@${attendeeNickname} has been removed from the event by the host.`,
          timestamp: new Date(),
          isSystem: true
        }
      ]
    }));

    // Notify the removed player
    addNotification(
      attendeeId,
      `You have been removed from "${event.title}" by the host. We hope to see you at another event!`,
      'error',
      event.id
    );
  };

  const getApplicantProfile = (userId) => {
    const user = users.find(u => u.id === userId);
    return {
      ...user,
      rating: calculateAverageRating(userId),
      reviewCount: (reviews[userId] || []).length
    };
  };

  if (selectedApplicant) {
    const profile = getApplicantProfile(selectedApplicant.userId);
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="p-4">
          <div className="bg-white border rounded-lg p-6">
            <div className="flex items-start gap-4 mb-4">
              {profile.image ? (
                <img src={profile.image} alt={profile.nickname} className="w-24 h-24 rounded-full object-cover flex-shrink-0" />
              ) : (
                <div className="w-24 h-24 rounded-full bg-blue-200 flex items-center justify-center flex-shrink-0">
                  <User size={48} className="text-blue-600" />
                </div>
              )}
              <div className="flex-1">
                <p className="font-bold text-2xl">{profile.firstName}</p>
                <p className="text-gray-600 mb-2">@{profile.nickname}</p>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map(card => (
                      <span key={card} className={`text-xl ${profile.rating >= card ? 'text-red-500' : 'text-gray-300'}`}>
                        ♠
                      </span>
                    ))}
                  </div>
                  {profile.reviewCount > 0 && (
                    <span className="text-sm text-gray-600">({profile.reviewCount} {profile.reviewCount === 1 ? 'review' : 'reviews'})</span>
                  )}
                </div>
                {profile.bio && (
                  <p className="text-gray-700 mb-3">{profile.bio}</p>
                )}
              </div>
            </div>

            {selectedApplicant.message && (
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <p className="font-semibold text-sm text-gray-600 mb-2">Application Message:</p>
                <p className="text-gray-800">{selectedApplicant.message}</p>
              </div>
            )}

            <div className="flex gap-2">
              <button
                onClick={() => handleApplicant(selectedApplicant.userId, 'accept')}
                className="flex-1 bg-green-600 text-white p-3 rounded-lg flex items-center justify-center gap-2 font-semibold"
              >
                <Check size={20} />
                Accept
              </button>
              <button
                onClick={() => handleApplicant(selectedApplicant.userId, 'reject')}
                className="flex-1 bg-red-600 text-white p-3 rounded-lg flex items-center justify-center gap-2 font-semibold"
              >
                <X size={20} />
                Reject
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4">

        {/* Approved Players */}
        <h3 className="text-lg font-bold mb-3 text-gray-800">
          Approved Players ({event.attendees.filter(id => id !== event.hostId).length})
        </h3>
        <div className="space-y-3 mb-6">
          {event.attendees.filter(id => id !== event.hostId).map(attendeeId => {
            const profile = getApplicantProfile(attendeeId);
            return (
              <div key={attendeeId} className="bg-white border-2 border-gray-100 rounded-xl p-4 flex items-center gap-3">
                {profile.image ? (
                  <img src={profile.image} alt={profile.nickname} className="w-12 h-12 rounded-full object-cover flex-shrink-0" />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center flex-shrink-0">
                    <User size={24} className="text-white" />
                  </div>
                )}
                <div className="flex-1">
                  <p className="font-bold text-gray-900">{profile.firstName}</p>
                  <p className="text-sm text-gray-500">@{profile.nickname}</p>
                </div>
                <button
                  onClick={() => handleRemove(attendeeId)}
                  className="flex items-center gap-1 text-sm text-red-500 border border-red-200 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg font-semibold transition"
                >
                  <X size={14} />
                  Remove
                </button>
              </div>
            );
          })}
          {event.attendees.filter(id => id !== event.hostId).length === 0 && (
            <p className="text-gray-500 text-center py-4 text-sm">No approved players yet</p>
          )}
        </div>

        {/* Pending Applications */}
        {(() => {
          const pendingApplicants = event.applicants.filter(a => a.status !== 'rejected');
          return (
            <>
              <h3 className="text-lg font-bold mb-3 text-gray-800">Pending Applications ({pendingApplicants.length})</h3>
              <div className="space-y-3">
                {pendingApplicants.map(applicant => {
            const profile = getApplicantProfile(applicant.userId);
            return (
              <div 
                key={applicant.userId} 
                className="bg-white border rounded-lg p-4"
              >
                <div 
                  onClick={() => setSelectedApplicant(applicant)}
                  className="flex items-start gap-3 mb-3 cursor-pointer"
                >
                  {profile.image ? (
                    <img src={profile.image} alt={profile.nickname} className="w-16 h-16 rounded-full object-cover flex-shrink-0" />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-blue-200 flex items-center justify-center flex-shrink-0">
                      <User size={32} className="text-blue-600" />
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="font-bold text-lg">{profile.firstName}</p>
                    <p className="text-sm text-gray-600 mb-1">@{profile.nickname}</p>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map(card => (
                          <span key={card} className={`text-lg ${profile.rating >= card ? 'text-red-500' : 'text-gray-300'}`}>
                            ♠
                          </span>
                        ))}
                      </div>
                      {profile.reviewCount > 0 && (
                        <span className="text-sm text-gray-600">({profile.reviewCount})</span>
                      )}
                    </div>
                    {applicant.message && (
                      <p className="text-sm text-gray-600 italic line-clamp-2">
                        "{applicant.message}"
                      </p>
                    )}
                  </div>
                  <ChevronLeft className="transform rotate-180 text-gray-400" size={20} />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleApplicant(applicant.userId, 'accept');
                    }}
                    className="flex-1 bg-green-600 text-white p-3 rounded-lg flex items-center justify-center gap-2 font-semibold"
                  >
                    <Check size={18} />
                    Accept
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleApplicant(applicant.userId, 'reject');
                    }}
                    className="flex-1 bg-red-600 text-white p-3 rounded-lg flex items-center justify-center gap-2 font-semibold"
                  >
                    <X size={18} />
                    Reject
                  </button>
                </div>
              </div>
            );
                  })}
                  {pendingApplicants.length === 0 && (
                    <p className="text-gray-500 text-center py-4">No pending applications</p>
                  )}
                </div>
            </>
          );
        })()}
      </div>
    </div>
  );
};

const NotificationsScreen = ({ onBack, onNavigate, onSelectEvent }) => {
  const { currentUser, notifications, setNotifications, events } = useContext(AppContext);
  const [hasMarkedRead, setHasMarkedRead] = React.useState(false);
  
  const userNotifications = (notifications[currentUser?.id] || []).sort((a, b) => 
    new Date(b.timestamp) - new Date(a.timestamp)
  );

  // Mark all notifications as read when screen opens (only once)
  React.useEffect(() => {
    if (!hasMarkedRead && userNotifications.some(n => !n.read)) {
      setNotifications(prev => ({
        ...prev,
        [currentUser.id]: (prev[currentUser.id] || []).map(n => ({ ...n, read: true }))
      }));
      setHasMarkedRead(true);
    }
  }, [hasMarkedRead, userNotifications.length]);

  const handleNotificationClick = (notif) => {
    if (!notif.eventId) return;
    const event = events.find(e => e.id === notif.eventId);
    if (!event) return;
    onSelectEvent(event);
    if (notif.destination === 'manageApplicants') {
      onNavigate('manageApplicants');
    } else {
      onNavigate('chat');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4 space-y-3">
        {userNotifications.length === 0 && (
          <p className="text-gray-500 text-center py-8">No notifications yet</p>
        )}
        {userNotifications.map(notif => (
          <div
            key={notif.id}
            onClick={() => handleNotificationClick(notif)}
            className={`p-4 rounded-lg border bg-white
            ${notif.type === 'success' ? 'border-l-4 border-l-green-500' : ''}
            ${notif.type === 'error' ? 'border-l-4 border-l-red-500' : ''}
            ${notif.type === 'info' ? 'border-l-4 border-l-blue-500' : ''}
            ${notif.eventId ? 'cursor-pointer hover:shadow-md transition' : ''}`}
          >
            <p className="font-semibold">{notif.message}</p>
            <p className="text-xs text-gray-500 mt-1">
              {new Date(notif.timestamp).toLocaleString()}
            </p>
            {notif.eventId && (
              <p className="text-xs text-blue-600 mt-1">
                {notif.destination === 'manageApplicants' ? 'Tap to manage applicants →' : 'Tap to open chat →'}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const ReviewEventScreen = ({ event, onBack }) => {
  const { currentUser, users, reviews, setReviews } = useContext(AppContext);
  const [ratings, setRatings] = useState({});
  const [comments, setComments] = useState({});
  
  const attendees = event.attendees
    .filter(id => id !== currentUser.id)
    .map(id => users.find(u => u.id === id));
  const host = users.find(u => u.id === event.hostId);

  const getUserName = (user) => user?.nickname || user?.firstName || 'Unknown';

  const handleSubmit = () => {
    const newReviews = { ...reviews };
    Object.keys(ratings).forEach(userId => {
      if (!newReviews[userId]) newReviews[userId] = [];
      newReviews[userId].push({
        rating: ratings[userId],
        comment: comments[userId] || '',
        reviewerId: currentUser.id,
        eventId: event.id
      });
    });
    setReviews(newReviews);
    alert('Reviews submitted!');
    onBack();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4 space-y-4">
        <div className="bg-white rounded-lg p-4">
          <h3 className="font-bold mb-3">Rate the Host: {getUserName(host)}</h3>
          <div className="flex gap-2 mb-3">
            {[1, 2, 3, 4, 5].map(star => (
              <button
                key={star}
                onClick={() => setRatings({ ...ratings, [host.id]: star })}
              >
                <Star
                  size={32}
                  className={ratings[host.id] >= star ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                />
              </button>
            ))}
          </div>
          <textarea
            placeholder="Add a comment (optional)"
            value={comments[host.id] || ''}
            onChange={(e) => setComments({ ...comments, [host.id]: e.target.value })}
            className="w-full p-2 border rounded-lg"
            rows="2"
          />
        </div>

        {attendees.map(attendee => (
          <div key={attendee.id} className="bg-white rounded-lg p-4">
            <h3 className="font-bold mb-3">Rate Player: {getUserName(attendee)}</h3>
            <div className="flex gap-2 mb-3">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  onClick={() => setRatings({ ...ratings, [attendee.id]: star })}
                >
                  <Star
                    size={32}
                    className={ratings[attendee.id] >= star ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                  />
                </button>
              ))}
            </div>
            <textarea
              placeholder="Add a comment (optional)"
              value={comments[attendee.id] || ''}
              onChange={(e) => setComments({ ...comments, [attendee.id]: e.target.value })}
              className="w-full p-2 border rounded-lg"
              rows="2"
            />
          </div>
        ))}

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold"
        >
          Submit Reviews
        </button>
      </div>
    </div>
  );
};

const ProfileScreen = ({ onBack, onSetBackHandler }) => {
  const { currentUser, setCurrentUser, users, setUsers } = useContext(AppContext);
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState(currentUser?.firstName || '');
  const [nickname, setNickname] = useState(currentUser?.nickname || '');
  const [bio, setBio] = useState(currentUser?.bio || '');
  const [image, setImage] = useState(currentUser?.image || '');

  const enterEditMode = () => {
    setIsEditing(true);
    onSetBackHandler(() => exitEditMode); // Back button cancels edit, wrapped to avoid React updater confusion
  };

  const exitEditMode = () => {
    setFirstName(currentUser?.firstName || '');
    setNickname(currentUser?.nickname || '');
    setBio(currentUser?.bio || '');
    setImage(currentUser?.image || '');
    setIsEditing(false);
    onSetBackHandler(null); // Restore normal back behaviour
  };

  const handleSave = () => {
    const updatedUser = {
      ...currentUser,
      firstName,
      nickname,
      bio,
      image
    };
    
    const updatedUsers = users.map(u => u.id === currentUser.id ? updatedUser : u);
    setUsers(updatedUsers);
    setCurrentUser(updatedUser);
    setIsEditing(false);
    onSetBackHandler(null); // Restore normal back behaviour
    alert('Profile updated successfully!');
  };

  const handleCancel = () => {
    exitEditMode();
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <div className="p-4">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex justify-center mb-6">
            {image ? (
              <img src={image} alt="Profile" className="w-32 h-32 rounded-full object-cover" />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-400 to-orange-400 flex items-center justify-center">
                <User size={64} className="text-white" />
              </div>
            )}
          </div>

          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-2 text-gray-700">First Name *</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none transition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2 text-gray-700">Nickname *</label>
                <input
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none transition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2 text-gray-700">Bio (optional)</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell us about yourself..."
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none transition"
                  rows="4"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2 text-gray-700">Profile Image URL (optional)</label>
                <input
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none transition"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={handleSave}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-orange-500 text-white p-3 rounded-xl font-bold hover:shadow-lg transition"
                >
                  Save Changes
                </button>
                <button
                  onClick={handleCancel}
                  className="flex-1 bg-gray-200 text-gray-700 p-3 rounded-xl font-bold hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 font-medium">First Name</p>
                <p className="text-lg font-bold text-gray-900">{currentUser?.firstName || 'Not set'}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500 font-medium">Nickname</p>
                <p className="text-lg font-bold text-gray-900">{currentUser?.nickname || 'Not set'}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500 font-medium">Email</p>
                <p className="text-base text-gray-700">{currentUser?.email}</p>
              </div>

              {currentUser?.bio && (
                <div>
                  <p className="text-sm text-gray-500 font-medium">Bio</p>
                  <p className="text-gray-700">{currentUser.bio}</p>
                </div>
              )}

              <button
                onClick={enterEditMode}
                className="w-full bg-gradient-to-r from-purple-600 to-orange-500 text-white p-3 rounded-xl font-bold hover:shadow-lg transition mt-4"
              >
                Edit Profile
              </button>

              <button
                onClick={handleLogout}
                className="w-full bg-red-500 text-white p-3 rounded-xl font-bold hover:bg-red-600 hover:shadow-lg transition flex items-center justify-center gap-2"
              >
                <LogOut size={20} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const EventChatScreen = ({ event, onBack }) => {
  const { currentUser, users, chats, setChats, notifications, setNotifications, events, lastRead, setLastRead } = useContext(AppContext);
  const [message, setMessage] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [cursorPosition, setCursorPosition] = useState(0);

  // Always read live event from context so attendee list is up to date
  const liveEvent = events.find(e => e.id === event.id) || event;
  const isStillAttendee = liveEvent.attendees.includes(currentUser.id);
  const eventChats = chats[event.id] || [];

  // Mark chat as read when opened
  React.useEffect(() => {
    setLastRead(prev => ({
      ...prev,
      [currentUser.id]: {
        ...(prev[currentUser.id] || {}),
        [event.id]: new Date().toISOString()
      }
    }));
  }, [event.id, currentUser.id, setLastRead]);

  const addNotification = (userId, message, type, eventId = null) => {
    setNotifications(prev => ({
      ...prev,
      [userId]: [
        ...(prev[userId] || []),
        { id: Date.now().toString(), message, type, read: false, timestamp: new Date(), eventId }
      ]
    }));
  };

  const detectMentions = (text) => {
    const mentionPattern = /@(\w+)/g;
    const mentions = [];
    let match;
    
    while ((match = mentionPattern.exec(text)) !== null) {
      mentions.push(match[1]);
    }
    
    return mentions;
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    const position = e.target.selectionStart;
    setMessage(value);
    setCursorPosition(position);

    // Check if user is typing a mention
    const textBeforeCursor = value.substring(0, position);
    const mentionMatch = textBeforeCursor.match(/@(\w*)$/);
    
    if (mentionMatch) {
      const searchTerm = mentionMatch[1].toLowerCase();
      const currentEvent = events.find(ev => ev.id === event.id);
      const attendeesList = currentEvent?.attendees || [];
      
      const filteredUsers = users
        .filter(u => attendeesList.includes(u.id) && u.id !== currentUser.id)
        .filter(u => u.nickname.toLowerCase().includes(searchTerm))
        .slice(0, 5);
      
      setSuggestions(filteredUsers);
      setShowSuggestions(filteredUsers.length > 0);
    } else {
      setShowSuggestions(false);
      setSuggestions([]);
    }
  };

  const insertMention = (nickname) => {
    const textBeforeCursor = message.substring(0, cursorPosition);
    const textAfterCursor = message.substring(cursorPosition);
    
    // Remove the partial mention
    const beforeMention = textBeforeCursor.replace(/@\w*$/, '');
    const newMessage = `${beforeMention}@${nickname} ${textAfterCursor}`;
    
    setMessage(newMessage);
    setShowSuggestions(false);
    setSuggestions([]);
  };

  const sendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      userId: currentUser.id,
      message: message.trim(),
      timestamp: new Date(),
      isSystem: false
    };

    setChats(prev => ({
      ...prev,
      [event.id]: [...(prev[event.id] || []), newMessage]
    }));

    // Detect mentions and send notifications
    const mentions = detectMentions(message);
    if (mentions.length > 0) {
      const currentEvent = events.find(e => e.id === event.id);
      currentEvent?.attendees.forEach(attendeeId => {
        if (attendeeId !== currentUser.id) {
          const user = users.find(u => u.id === attendeeId);
          if (user && mentions.includes(user.nickname)) {
            addNotification(
              attendeeId,
              `${currentUser.nickname} mentioned you in "${event.title}" chat`,
              'info',
              event.id
            );
          }
        }
      });
    }

    setMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const getUserName = (userId) => {
    if (userId === 'system') return 'System';
    const user = users.find(u => u.id === userId);
    if (!user) return 'Unknown';
    return `${user.firstName} @${user.nickname}`;
  };

  if (!isStillAttendee) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center p-6">
        <div className="text-center">
          <MessageCircle size={64} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">Chat Unavailable</h3>
          <p className="text-gray-500 max-w-xs">You no longer have access to this event's chat.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {eventChats.map((chat) => {
          const isCurrentUser = chat.userId === currentUser.id;
          const isSystemMessage = chat.isSystem;

          if (isSystemMessage) {
            return (
              <div key={chat.id} className="flex justify-center">
                <div className="bg-blue-100 border border-blue-300 rounded-lg p-3 max-w-md text-center">
                  <p className="text-sm text-blue-800">{chat.message}</p>
                </div>
              </div>
            );
          }

          return (
            <div key={chat.id} className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs ${isCurrentUser ? 'bg-blue-600 text-white' : 'bg-white border'} rounded-lg p-3`}>
                <p className={`text-xs font-semibold mb-1 ${isCurrentUser ? 'text-blue-100' : 'text-gray-600'}`}>
                  {getUserName(chat.userId)}
                </p>
                <p className="text-sm">{chat.message}</p>
                <p className={`text-xs mt-1 ${isCurrentUser ? 'text-blue-100' : 'text-gray-400'}`}>
                  {new Date(chat.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white border-t p-4">
        {showSuggestions && suggestions.length > 0 && (
          <div className="mb-2 bg-white border rounded-lg shadow-lg max-h-40 overflow-y-auto">
            {suggestions.map(user => (
              <button
                key={user.id}
                onClick={() => insertMention(user.nickname)}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
              >
                {user.image ? (
                  <img src={user.image} alt={user.nickname} className="w-8 h-8 rounded-full object-cover" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center">
                    <User size={16} className="text-blue-600" />
                  </div>
                )}
                <div>
                  <p className="font-semibold text-sm">{user.firstName}</p>
                  <p className="text-xs text-gray-600">@{user.nickname}</p>
                </div>
              </button>
            ))}
          </div>
        )}
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Type a message... (use @ to mention)"
            className="flex-1 p-3 border rounded-lg"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 text-white p-3 rounded-lg"
            disabled={!message.trim()}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

const GroupChatsScreen = ({ onBack, onNavigate, onSelectEvent }) => {
  const { currentUser, events, chats, users, lastRead } = useContext(AppContext);

  // Get all events where user is a current attendee (live check)
  const userEvents = events.filter(event => 
    event.attendees && event.attendees.includes(currentUser.id)
  );

  // Create chat list with metadata
  const chatList = userEvents
    .map(event => {
      const eventChats = chats[event.id] || [];
      const lastMessage = eventChats[eventChats.length - 1];
      
      // Check if chat has unread messages
      const userLastRead = lastRead[currentUser.id]?.[event.id];
      const hasUnread = lastMessage && (!userLastRead || new Date(lastMessage.timestamp) > new Date(userLastRead));
      
      return {
        event,
        lastMessage,
        hasUnread,
        messageCount: eventChats.length
      };
    })
    .filter(item => item.messageCount > 0) // Only show chats with messages
    .sort((a, b) => {
      // Sort by most recent message
      if (!a.lastMessage) return 1;
      if (!b.lastMessage) return -1;
      return new Date(b.lastMessage.timestamp) - new Date(a.lastMessage.timestamp);
    });

  const handleChatClick = (event) => {
    onSelectEvent(event);
    onNavigate('chat');
  };

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const messageDate = new Date(timestamp);
    const diffMs = now - messageDate;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return messageDate.toLocaleDateString();
  };

  const getUserName = (userId) => {
    if (userId === 'system') return 'System';
    const user = users.find(u => u.id === userId);
    return user?.nickname || user?.firstName || 'Unknown';
  };

  // Empty state
  if (chatList.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center p-6">
        <div className="text-center">
          <MessageCircle size={64} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">No Event Chats Yet</h3>
          <p className="text-gray-600 max-w-sm">
            You have not joined any events yet. Apply for events in order to join the chat.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <div className="p-4 space-y-3">
        {chatList.map(({ event, lastMessage, hasUnread }) => (
          <div
            key={event.id}
            onClick={() => handleChatClick(event)}
            className={`bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all cursor-pointer ${
              hasUnread ? 'border-2 border-orange-400' : 'border border-gray-200'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                {/* Event name and game */}
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-gray-900 truncate">{event.title}</h3>
                  {hasUnread && (
                    <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                  )}
                </div>
                <p className="text-sm text-gray-500 mb-2 flex items-center gap-1">
                  <Dices size={14} />
                  {event.gameName}
                </p>

                {/* Last message preview */}
                {lastMessage && (
                  <div className="bg-gray-50 rounded-lg p-2 mb-2">
                    <p className="text-xs font-semibold text-gray-600 mb-1">
                      {getUserName(lastMessage.userId)}
                    </p>
                    <p className="text-sm text-gray-700 line-clamp-2">
                      {lastMessage.message}
                    </p>
                  </div>
                )}
              </div>

              {/* Timestamp */}
              <div className="text-xs text-gray-400 flex-shrink-0">
                {lastMessage && getTimeAgo(lastMessage.timestamp)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;