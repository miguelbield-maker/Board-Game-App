import React, { useState, createContext, useContext } from 'react';
import { ChevronLeft, Calendar, MapPin, Users, Bell, User, Plus, Search, Star, X, Check, Filter, MessageCircle, Send, LogOut, Home } from 'lucide-react';

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
      experience: 'intermediate',
      hostId: '1',
      applicants: [
        { userId: '4', status: 'pending', message: 'Hi! I have a great collection of games and would love to join. I can bring snacks too!' },
        { userId: '5', status: 'pending', message: 'Looking forward to playing Catan with you all!' }
      ],
      attendees: ['1', '2', '3'],
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
  const [chats, setChats] = useState({});

  // GameHub - Reloaded
  return (
    <AppContext.Provider value={{
      currentUser, setCurrentUser,
      users, setUsers,
      events, setEvents,
      notifications, setNotifications,
      reviews, setReviews,
      chats, setChats
    }}>
      <BoardGameApp />
    </AppContext.Provider>
  );
};

const BoardGameApp = () => {
  const { currentUser } = useContext(AppContext);
  const [screen, setScreen] = useState('home');
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Reset to home when user logs in
  React.useEffect(() => {
    if (currentUser) {
      setScreen('home');
    }
  }, [currentUser]);

  if (!currentUser) {
    return <AuthScreen />;
  }

  const renderScreen = () => {
    switch (screen) {
      case 'home':
        return <HomeScreen onNavigate={setScreen} onSelectEvent={setSelectedEvent} />;
      case 'eventDetail':
        return <EventDetailScreen event={selectedEvent} onBack={() => setScreen('home')} onNavigate={setScreen} />;
      case 'createEvent':
        return <CreateEventScreen onBack={() => setScreen('home')} />;
      case 'myEvents':
        return (
          <div className="p-4">
            <MyEventsScreen onNavigate={setScreen} onSelectEvent={setSelectedEvent} />
          </div>
        );
      case 'notifications':
        return (
          <div className="p-4 space-y-3">
            <NotificationsScreen onBack={() => setScreen('home')} onNavigate={setScreen} onSelectEvent={setSelectedEvent} />
          </div>
        );
      case 'manageApplicants':
        return <ManageApplicantsScreen event={selectedEvent} onBack={() => setScreen('myEvents')} onEventFull={(event) => { setSelectedEvent(event); setScreen('eventDetail'); }} />;
      case 'reviewEvent':
        return <ReviewEventScreen event={selectedEvent} onBack={() => setScreen('home')} />;
      case 'chat':
        return <EventChatScreen event={selectedEvent} onBack={() => setScreen('eventDetail')} />;
      case 'profile':
        return <ProfileScreen onBack={() => setScreen('home')} />;
      case 'groupChats':
        return <GroupChatsScreen onBack={() => setScreen('home')} />;
      default:
        return <HomeScreen onNavigate={setScreen} onSelectEvent={setSelectedEvent} />;
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 min-h-screen flex flex-col">
      <Header onNavigate={setScreen} currentScreen={screen} />
      <div className="flex-1 overflow-y-auto pb-20">
        {renderScreen()}
      </div>
      <BottomNav currentScreen={screen} onNavigate={setScreen} />
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
        return 'Group Chats';
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
    if (onBack) {
      onBack();
    } else {
      onNavigate('home');
    }
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
    { id: 'groupChats', label: 'Groups', icon: MessageCircle },
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
        <div className="mt-4 p-3 bg-gray-100 rounded text-sm">
          <p className="font-semibold">Demo Account:</p>
          <p>Email: demo@test.com</p>
          <p>Password: password</p>
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
  const visibleEvents = upcomingEvents.filter(e => {
    const isFull = e.attendees.length >= e.maxPlayers;
    const isAttendee = e.attendees.includes(currentUser.id);
    const hasPendingApplication = e.applicants.some(a => a.userId === currentUser.id);
    
    // Show event if: not full, OR user is attending, OR user has pending application
    return !isFull || isAttendee || hasPendingApplication;
  });
  
  const filteredEvents = visibleEvents.filter(e => {
    const matchesSearch = e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         e.gameName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = !filterCity || e.city.toLowerCase().includes(filterCity.toLowerCase());
    const matchesDate = !filterDate || e.date === filterDate;
    const matchesExperience = !filterExperience || e.experience === filterExperience;
    
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
                  <h4 className="font-bold text-lg text-gray-900 leading-tight mb-1">{event.title}</h4>
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
                      {event.experience.charAt(0).toUpperCase() + event.experience.slice(1)}
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

const EventDetailScreen = ({ event, onBack, onNavigate }) => {
  const { currentUser, events, setEvents, users, notifications, setNotifications, reviews } = useContext(AppContext);
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
    alert('You have left the event');
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
              Manage Applicants ({event.applicants.length})
            </button>
          )}

          {isFull && isAttendee && (
            <button
              onClick={() => onNavigate('chat')}
              className="w-full bg-purple-600 text-white p-3 rounded-lg font-semibold mb-2 flex items-center justify-center gap-2"
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
                  className="w-full bg-green-600 text-white p-3 rounded-lg font-semibold"
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
                      className="flex-1 bg-green-600 text-white p-3 rounded-lg font-semibold"
                    >
                      Submit Application
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
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 p-3 rounded-lg">
              Application pending...
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
  const { currentUser, events, setEvents } = useContext(AppContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [gameName, setGameName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [maxPlayers, setMaxPlayers] = useState(4);
  const [currentPlayers, setCurrentPlayers] = useState(1);
  const [experience, setExperience] = useState('');
  const [dateError, setDateError] = useState('');
  const [timeError, setTimeError] = useState('');
  const [errors, setErrors] = useState({});

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setDate(selectedDate);
    
    const today = new Date().toISOString().split('T')[0];
    if (selectedDate < today) {
      setDateError('Please select today or a future date');
    } else {
      setDateError('');
      // Re-validate time if date changes
      if (time) {
        validateTime(selectedDate, time);
      }
    }
  };

  const validateTime = (selectedDate, selectedTime) => {
    const selectedDateTime = new Date(`${selectedDate}T${selectedTime}`);
    const now = new Date();
    
    if (selectedDateTime < now) {
      setTimeError('Please select a future time');
      return false;
    } else {
      setTimeError('');
      return true;
    }
  };

  const handleTimeChange = (e) => {
    const selectedTime = e.target.value;
    setTime(selectedTime);
    
    if (date) {
      validateTime(date, selectedTime);
    }
  };

  const handleSubmit = () => {
    console.log('Form values:', { title, description, gameName, date, time, city, country, experience, maxPlayers, currentPlayers });
    
    // Reset errors
    const newErrors = {};
    
    // Check all required fields
    if (!title) newErrors.title = true;
    if (!description) newErrors.description = true;
    if (!gameName) newErrors.gameName = true;
    if (!date) newErrors.date = true;
    if (!time) newErrors.time = true;
    if (!city) newErrors.city = true;
    if (!country) newErrors.country = true;
    if (!experience) newErrors.experience = true;
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      alert('Please fill in all required fields');
      console.log('Missing fields:', newErrors);
      return;
    }
    
    if (currentPlayers >= maxPlayers) {
      alert('Current players must be less than max players');
      return;
    }
    
    // Check if selected date/time is in the past
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
    console.log('Creating event:', newEvent);
    setEvents([...events, newEvent]);
    alert('Event created successfully!');
    onBack();
  };

  return (
    <div className="p-4 space-y-4">
      <div>
        <div>
          <label className="block text-sm font-semibold mb-1">Event Title *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setErrors({...errors, title: false});
            }}
            className={`w-full p-3 border rounded-lg ${errors.title ? 'border-red-500' : ''}`}
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">Required</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Board Game Name *</label>
          <input
            type="text"
            value={gameName}
            onChange={(e) => {
              setGameName(e.target.value);
              setErrors({...errors, gameName: false});
            }}
            className={`w-full p-3 border rounded-lg ${errors.gameName ? 'border-red-500' : ''}`}
          />
          {errors.gameName && <p className="text-red-500 text-sm mt-1">Required</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Description *</label>
          <textarea
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              setErrors({...errors, description: false});
            }}
            className={`w-full p-3 border rounded-lg ${errors.description ? 'border-red-500' : ''}`}
            rows="3"
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">Required</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Date *</label>
          <input
            type="date"
            value={date}
            onChange={(e) => {
              handleDateChange(e);
              setErrors({...errors, date: false});
            }}
            min={new Date().toISOString().split('T')[0]}
            className={`w-full p-3 border rounded-lg ${dateError || errors.date ? 'border-red-500' : ''}`}
          />
          {dateError && <p className="text-red-500 text-sm mt-1">{dateError}</p>}
          {errors.date && !dateError && <p className="text-red-500 text-sm mt-1">Required</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Time *</label>
          <input
            type="time"
            value={time}
            onChange={(e) => {
              handleTimeChange(e);
              setErrors({...errors, time: false});
            }}
            className={`w-full p-3 border rounded-lg ${timeError || errors.time ? 'border-red-500' : ''}`}
          />
          {timeError && <p className="text-red-500 text-sm mt-1">{timeError}</p>}
          {errors.time && !timeError && <p className="text-red-500 text-sm mt-1">Required</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">City *</label>
          <input
            type="text"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
              setErrors({...errors, city: false});
            }}
            placeholder="e.g., Singapore"
            className={`w-full p-3 border rounded-lg ${errors.city ? 'border-red-500' : ''}`}
          />
          {errors.city && <p className="text-red-500 text-sm mt-1">Required</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Country *</label>
          <input
            type="text"
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
              setErrors({...errors, country: false});
            }}
            placeholder="e.g., Singapore"
            className={`w-full p-3 border rounded-lg ${errors.country ? 'border-red-500' : ''}`}
          />
          {errors.country && <p className="text-red-500 text-sm mt-1">Required</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Total Players Needed *</label>
          <input
            type="number"
            value={maxPlayers}
            onChange={(e) => setMaxPlayers(e.target.value)}
            className="w-full p-3 border rounded-lg"
            min="2"
            max="20"
            required
          />
          <p className="text-xs text-gray-500 mt-1">Total number of players for this game</p>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Players Already Joining (including you) *</label>
          <input
            type="number"
            value={currentPlayers}
            onChange={(e) => setCurrentPlayers(e.target.value)}
            className="w-full p-3 border rounded-lg"
            min="1"
            max={maxPlayers}
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            Players needed: {Math.max(0, maxPlayers - currentPlayers)}
          </p>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Player Experience *</label>
          <select
            value={experience}
            onChange={(e) => {
              setExperience(e.target.value);
              setErrors({...errors, experience: false});
            }}
            className={`w-full p-3 border rounded-lg ${errors.experience ? 'border-red-500' : ''}`}
          >
            <option value="">Select experience level</option>
            <option value="beginner">Beginner (First time player)</option>
            <option value="intermediate">Intermediate (Needs a quick refresher)</option>
            <option value="master">Master (Knows the game in and out)</option>
          </select>
          {errors.experience && <p className="text-red-500 text-sm mt-1">Required</p>}
          <p className="text-xs text-gray-500 mt-1">
            This helps players know if they need to learn the rules beforehand
          </p>
        </div>

        <button 
          type="button" 
          onClick={handleSubmit} 
          className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold"
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-600 text-white p-4 flex items-center gap-3">
        <button onClick={() => onNavigate('home')}>
          <ChevronLeft size={24} />
        </button>
        <h2 className="text-xl font-bold">My Events</h2>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-bold mb-3">Events I'm Hosting</h3>
        <div className="space-y-3 mb-6">
          {myHostedEvents.map(event => {
            const attendeeProfiles = event.attendees.slice(0, 4).map(id => users.find(u => u.id === id));
            const remainingCount = event.attendees.length - 4;
            
            return (
              <div
                key={event.id}
                onClick={() => {
                  onSelectEvent(event);
                  onNavigate('eventDetail');
                }}
                className="bg-white border-2 border-gray-100 rounded-2xl p-4 cursor-pointer hover:shadow-lg transition"
              >
                <h4 className="font-bold text-lg text-gray-900">{event.title}</h4>
                <p className="text-sm text-purple-600 font-bold">{event.gameName}</p>
                <p className="text-sm text-gray-500 font-medium">{event.date.split('-').reverse().join('/')} at {event.time}</p>
                <div className="flex items-center justify-between mt-3">
                  <p className="text-sm text-purple-600 font-bold">
                    {event.applicants.length} pending {event.applicants.length === 1 ? 'application' : 'applications'}
                  </p>
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
          {myHostedEvents.length === 0 && (
            <p className="text-gray-500 text-center py-8 text-base">No hosted events yet</p>
          )}
        </div>

        <h3 className="text-xl font-bold mb-4 text-gray-800">Events I'm Attending</h3>
        <div className="space-y-3">
          {myAttendingEvents.map(event => {
            const attendeeProfiles = event.attendees.slice(0, 4).map(id => users.find(u => u.id === id));
            const remainingCount = event.attendees.length - 4;
            
            return (
              <div
                key={event.id}
                onClick={() => {
                  onSelectEvent(event);
                  onNavigate('eventDetail');
                }}
                className="bg-white border-2 border-gray-100 rounded-2xl p-4 cursor-pointer hover:shadow-lg transition"
              >
                <h4 className="font-bold text-lg text-gray-900">{event.title}</h4>
                <p className="text-sm text-purple-600 font-bold">{event.gameName}</p>
                <p className="text-sm text-gray-500 font-medium">{event.date.split('-').reverse().join('/')} at {event.time}</p>
                <div className="flex items-center justify-end mt-2">
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
          {myAttendingEvents.length === 0 && (
            <p className="text-gray-500 text-center py-8 text-base">Not attending any events yet</p>
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
    console.log('handleApplicant called:', { applicantId, action, eventId: event.id });
    console.log('Current event applicants:', event.applicants);
    
    const applicantUser = users.find(u => u.id === applicantId);
    const applicantNickname = applicantUser?.nickname || applicantUser?.firstName || 'there';
    
    if (action === 'accept') {
      addNotification(
        applicantId, 
        `Great news! Your application to "${event.title}" has been accepted! We're excited to play together. See you there! 🎲`, 
        'success'
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
          
          // If event becomes full after accepting, reject all other pending applicants
          if (isFull) {
            // Create welcome message in chat
            createWelcomeMessage(event.id, event.hostId, newAttendees);
            
            // Notify all attendees that the event is ready
            newAttendees.forEach(attendeeId => {
              addNotification(
                attendeeId,
                `Your event "${event.title}" is all set! Get ready for an amazing game night on ${event.date.split('-').reverse().join('/')} at ${event.time}! 🎲`,
                'success'
              );
            });
            
            // Auto-reject remaining applicants if any
            if (e.applicants.length > 1) {
              e.applicants.forEach(applicant => {
                if (applicant.userId !== applicantId) {
                  const otherUser = users.find(u => u.id === applicant.userId);
                  const otherNickname = otherUser?.nickname || otherUser?.firstName || 'there';
                  addNotification(
                    applicant.userId,
                    `The event "${event.title}" is already full. Apply for other game parties, don't give up ${otherNickname}!`,
                    'error'
                  );
                }
              });
            }
            
            updatedEvent = {
              ...e,
              applicants: [],
              attendees: newAttendees
            };
            
            return updatedEvent;
          }
          
          return {
            ...e,
            applicants: e.applicants.filter(a => a.userId !== applicantId),
            attendees: newAttendees
          };
        } else {
          // Reject action
          return {
            ...e,
            applicants: e.applicants.filter(a => a.userId !== applicantId)
          };
        }
      }
      return e;
    });
    
    console.log('Updated events:', updatedEvents);
    console.log('Event after update:', updatedEvents.find(e => e.id === event.id));
    
    setEvents(updatedEvents);
    
    // Redirect to event detail if event became full
    if (updatedEvent && updatedEvent.attendees.length >= updatedEvent.maxPlayers) {
      setSelectedApplicant(null);
      onEventFull(updatedEvent);
    } else {
      setSelectedApplicant(null);
    }
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
      <div className="bg-blue-600 text-white p-4 flex items-center gap-3">
        <button onClick={onBack}>
          <ChevronLeft size={24} />
        </button>
        <h2 className="text-xl font-bold">Manage Applicants</h2>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-bold mb-3">Pending Applications ({event.applicants.length})</h3>
        <div className="space-y-3">
          {event.applicants.map(applicant => {
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
          {event.applicants.length === 0 && (
            <p className="text-gray-500 text-center py-4">No pending applications</p>
          )}
        </div>
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
    // Navigate to event chat if eventId is present
    if (notif.eventId) {
      const event = events.find(e => e.id === notif.eventId);
      if (event) {
        onSelectEvent(event);
        onNavigate('chat');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-600 text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onBack}>
            <ChevronLeft size={24} />
          </button>
          <h2 className="text-xl font-bold">Notifications</h2>
        </div>
      </div>

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
              <p className="text-xs text-blue-600 mt-1">Tap to open chat →</p>
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

const ProfileScreen = ({ onBack }) => {
  const { currentUser, setCurrentUser, users, setUsers } = useContext(AppContext);
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState(currentUser?.firstName || '');
  const [nickname, setNickname] = useState(currentUser?.nickname || '');
  const [bio, setBio] = useState(currentUser?.bio || '');
  const [image, setImage] = useState(currentUser?.image || '');

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
    alert('Profile updated successfully!');
  };

  const handleCancel = () => {
    setFirstName(currentUser?.firstName || '');
    setNickname(currentUser?.nickname || '');
    setBio(currentUser?.bio || '');
    setImage(currentUser?.image || '');
    setIsEditing(false);
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
                onClick={() => setIsEditing(true)}
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
  const { currentUser, users, chats, setChats, notifications, setNotifications, events } = useContext(AppContext);
  const [message, setMessage] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [cursorPosition, setCursorPosition] = useState(0);
  const eventChats = chats[event.id] || [];

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
    return user?.nickname || user?.firstName || 'Unknown';
  };

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

const GroupChatsScreen = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <div className="p-4">
        <div className="text-center py-12">
          <MessageCircle size={64} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">Group Chats Coming Soon!</h3>
          <p className="text-gray-600">Connect with multiple gaming groups at once</p>
        </div>
      </div>
    </div>
  );
};

export default App;