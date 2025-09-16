# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

BusTracker Pro is a comprehensive bus fleet management dashboard built as a single-page application using vanilla web technologies. The application provides real-time monitoring, analytics, and control features for bus fleet operations.

## Common Development Commands

### Local Development
```bash
# Install dependencies
npm install

# Start development server with live reload
npm start
# Or with watch mode for CSS and JS changes
npm run dev

# Both commands serve on http://localhost:3000
```

### Build Process
```bash
# Currently basic - placeholder for future build pipeline
npm run build
```

### File Serving
The project uses `live-server` for development, which automatically serves static files and provides live reload functionality.

## Architecture and Code Structure

### Technology Stack
- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Mapping**: Leaflet.js for interactive maps
- **Charts**: Chart.js for data visualization
- **Icons**: Font Awesome 6.4.0
- **Dev Server**: live-server with hot reload

### Project Structure
```
ui-project/
├── index.html          # Main dashboard page with complete UI structure
├── css/
│   └── styles.css      # Comprehensive styling with CSS Grid and Flexbox
├── js/
│   └── app.js          # Main application logic and interactions
├── package.json        # Project configuration and dependencies
└── README.md           # Project documentation
```

### Key Architectural Patterns

#### Component-Based HTML Structure
The dashboard is organized into modular sections in `index.html`:
- **Header**: Logo, search, notifications, user profile
- **Sidebar**: Navigation menu with system status
- **Main Content**: Dashboard sections organized in CSS Grid layout
- **Dashboard Sections**: Metrics cards, live map, activity feed, quick actions, fleet status, performance metrics, route management, driver management, maintenance scheduling, fuel management, analytics, and system settings

#### CSS Architecture
`styles.css` follows a systematic approach:
- **Global Styles**: Reset and base typography
- **Component Styles**: Modular sections (header, sidebar, dashboard sections)
- **Layout System**: CSS Grid for main dashboard layout, Flexbox for components
- **Design System**: Consistent color palette, spacing, and typography
- **Interactive States**: Hover effects, active states, animations

#### JavaScript Architecture (`app.js`)
The application follows a modular initialization pattern:

```javascript path=null start=null
// Core initialization functions
- initializeMap()        # Leaflet map with bus markers and routes
- initializeCharts()     # Chart.js performance and driver statistics
- initializeRealTimeUpdates() # Simulated live data updates
- initializeInteractions() # Event handlers for UI interactions
```

**Key JavaScript Modules:**
- **Map Management**: Bus location markers, route polylines, popup information
- **Chart Management**: Performance metrics and driver statistics visualization
- **Real-Time Simulation**: Periodic updates to metrics, timestamps, and live indicators
- **User Interactions**: Navigation, search, quick actions, alert handling
- **Notification System**: Toast-style notifications for user feedback

#### Data Flow Pattern
The application uses a simulation-based approach for demonstrating real-time functionality:
- **Static Data**: Initial bus locations, routes, and performance metrics defined in JavaScript
- **Simulated Updates**: `setInterval` functions update metrics, timestamps, and live indicators
- **Event-Driven Updates**: User interactions trigger immediate UI updates and notifications

### Dashboard Features and Components

#### Live Mapping System
- Interactive Leaflet map with real-time bus locations
- Color-coded markers based on bus status (active/delayed/maintenance)
- Route visualization with polylines
- Popup information for each bus
- Map controls for zoom and center reset

#### Performance Analytics
- Real-time metrics dashboard with progress bars
- Chart.js integration for performance trends
- Key performance indicators (on-time performance, fuel efficiency, customer satisfaction)
- Driver statistics with doughnut charts

#### Fleet Management
- Comprehensive bus status tracking (active/idle/maintenance)
- Route management with real-time status updates
- Driver management with duty status and performance tracking
- Maintenance scheduling with priority alerts
- Fuel efficiency monitoring by route

#### Real-Time Features
- Live activity feed with timestamped events
- Automatic data refresh simulation
- System status monitoring
- Alert system with priority levels
- Live indicator animations

## Development Guidelines

### Working with Maps
- Bus locations and routes are defined in the `busLocations` array in `app.js`
- Map initialization uses NYC coordinates by default
- Marker colors are determined by the `getBusColor()` function based on bus status
- Route polylines can be added using Leaflet's `L.polyline()` method

### Working with Charts
- Performance chart displays trend data over time using Chart.js line charts
- Driver statistics use doughnut charts for status distribution
- Charts are responsive and resize with window changes
- Chart data is defined in the initialization functions

### Styling and Theming
- The application uses a consistent design system with CSS custom properties for colors
- Layout is primarily CSS Grid for main structure, Flexbox for components
- Color scheme: Primary blue (#3b82f6), success green (#059669), warning yellow (#f59e0b), danger red (#ef4444)
- Responsive design considerations are built into the CSS

### Adding New Dashboard Sections
Dashboard sections follow a consistent structure:
```html path=null start=null
<div class="dashboard-section">
    <div class="section-header">
        <h2>Section Title</h2>
        <div class="section-actions"><!-- Optional actions --></div>
    </div>
    <div class="section-content">
        <!-- Section-specific content -->
    </div>
</div>
```

### Real-Time Updates
- Use `setInterval` for periodic updates
- Update functions are modular and focused on specific UI elements
- Timestamp updates, metric changes, and live indicators have separate update cycles
- New real-time features should follow the existing simulation pattern

## File-Specific Notes

### index.html
- Complete dashboard UI structure with all components
- Uses CDN links for external dependencies (Font Awesome, Leaflet, Chart.js)
- Semantic HTML structure with accessibility considerations
- Grid-based layout system for responsive design

### styles.css
- Comprehensive styling covering all dashboard components
- Systematic organization: global → layout → components → interactions
- CSS Grid and Flexbox implementation for modern layout
- Animation and transition effects for enhanced UX

### app.js
- Modular initialization pattern with separate concerns
- Map integration with Leaflet.js
- Chart integration with Chart.js
- Real-time simulation system
- Event handling and user interactions
- Utility functions for common operations

This architecture enables rapid development of fleet management features while maintaining code organization and user experience consistency.
