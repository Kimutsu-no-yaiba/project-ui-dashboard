// Dashboard Application JavaScript

// Global variables
let map;
let performanceChart;
let driverChart;

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeMap();
    initializeCharts();
    initializeRealTimeUpdates();
    initializeInteractions();
});

// Initialize Leaflet Map
function initializeMap() {
    // Initialize map with default view
    map = L.map('map').setView([40.7128, -74.0060], 11); // New York City coordinates

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Sample bus locations and routes
    const busLocations = [
        { id: '001', lat: 40.7580, lng: -73.9855, status: 'active', route: 'A' },
        { id: '156', lat: 40.7505, lng: -73.9934, status: 'delayed', route: 'B' },
        { id: '247', lat: 40.7282, lng: -73.9942, status: 'active', route: 'A' },
        { id: '089', lat: 40.7589, lng: -73.9851, status: 'maintenance', route: 'C' },
        { id: '123', lat: 40.7614, lng: -73.9776, status: 'active', route: 'C' },
        { id: '199', lat: 40.7505, lng: -73.9857, status: 'active', route: 'B' },
        { id: '077', lat: 40.7282, lng: -74.0776, status: 'delayed', route: 'A' },
        { id: '234', lat: 40.7128, lng: -74.0060, status: 'active', route: 'B' }
    ];

    // Add bus markers to map
    busLocations.forEach(bus => {
        const color = getBusColor(bus.status);
        const marker = L.circleMarker([bus.lat, bus.lng], {
            color: color,
            fillColor: color,
            fillOpacity: 0.8,
            radius: 8
        }).addTo(map);

        // Add popup with bus information
        marker.bindPopup(`
            <div class="bus-popup">
                <h4>Bus #${bus.id}</h4>
                <p><strong>Route:</strong> ${bus.route}</p>
                <p><strong>Status:</strong> ${capitalizeFirst(bus.status)}</p>
                <p><strong>Last Update:</strong> 2 min ago</p>
            </div>
        `);
    });

    // Add sample route lines
    const routeA = [
        [40.7580, -73.9855],
        [40.7505, -73.9934],
        [40.7282, -73.9942],
        [40.7128, -74.0060]
    ];

    L.polyline(routeA, { 
        color: '#3b82f6', 
        weight: 4, 
        opacity: 0.7 
    }).addTo(map).bindPopup('Route A - Downtown Loop');

    // Fit map to show all markers
    const group = new L.featureGroup(map._layers);
    if (Object.keys(group._layers).length > 0) {
        map.fitBounds(group.getBounds().pad(0.1));
    }
}

// Get bus marker color based on status
function getBusColor(status) {
    switch(status) {
        case 'active': return '#059669';
        case 'delayed': return '#f59e0b';
        case 'maintenance': return '#ef4444';
        default: return '#6b7280';
    }
}

// Initialize Charts
function initializeCharts() {
    // Performance Chart
    const performanceCtx = document.getElementById('performanceChart');
    if (performanceCtx) {
        performanceChart = new Chart(performanceCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'On-Time Performance',
                    data: [89, 92, 88, 94, 96, 94],
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    tension: 0.4
                }, {
                    label: 'Fuel Efficiency',
                    data: [85, 87, 89, 86, 88, 87],
                    borderColor: '#059669',
                    backgroundColor: 'rgba(5, 150, 105, 0.1)',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    intersect: false,
                },
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                },
                scales: {
                    x: {
                        display: true,
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        beginAtZero: false,
                        min: 80,
                        max: 100,
                        grid: {
                            color: '#f1f5f9'
                        }
                    }
                },
                elements: {
                    point: {
                        radius: 4,
                        hoverRadius: 6
                    }
                }
            }
        });
    }

    // Driver Statistics Chart
    const driverCtx = document.getElementById('driverChart');
    if (driverCtx) {
        driverChart = new Chart(driverCtx, {
            type: 'doughnut',
            data: {
                labels: ['On Duty', 'Off Duty', 'Break'],
                datasets: [{
                    data: [24, 6, 2],
                    backgroundColor: ['#059669', '#6b7280', '#f59e0b'],
                    borderWidth: 2,
                    borderColor: '#ffffff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }
}

// Initialize real-time updates
function initializeRealTimeUpdates() {
    // Update timestamps every minute
    setInterval(updateTimestamps, 60000);

    // Simulate real-time data updates every 30 seconds
    setInterval(simulateDataUpdates, 30000);

    // Update live indicator
    setInterval(updateLiveIndicator, 2000);
}

// Update timestamps in activity items
function updateTimestamps() {
    const timeElements = document.querySelectorAll('.activity-time');
    timeElements.forEach(element => {
        const currentText = element.textContent;
        if (currentText.includes('minutes ago')) {
            const minutes = parseInt(currentText.match(/\d+/)[0]) + 1;
            element.textContent = `${minutes} minutes ago`;
        }
    });
}

// Simulate real-time data updates
function simulateDataUpdates() {
    // Update performance metrics slightly
    updateMetricValue('94.2%', generateRandomChange(94.2, 1));
    updateMetricValue('89.7%', generateRandomChange(89.7, 1));
    updateMetricValue('87.3%', generateRandomChange(87.3, 0.5));
    
    // Update active bus count
    const currentActive = parseInt(document.querySelector('.tracking-stats .stat-item').textContent.match(/\d+/)[0]);
    const newActive = Math.max(20, Math.min(28, currentActive + Math.floor(Math.random() * 3) - 1));
    document.querySelector('.tracking-stats .stat-item').textContent = `${newActive} Active`;
    
    // Update legend counts
    updateLegendCounts(newActive);
}

// Generate random change within bounds
function generateRandomChange(baseValue, maxChange) {
    const change = (Math.random() - 0.5) * maxChange * 2;
    return Math.max(0, Math.min(100, baseValue + change));
}

// Update metric value with animation
function updateMetricValue(selector, newValue) {
    const elements = document.querySelectorAll('.metric-percent, .metric-value');
    elements.forEach(element => {
        if (element.textContent === selector) {
            element.textContent = `${newValue.toFixed(1)}%`;
        }
    });
}

// Update map legend counts
function updateLegendCounts(activeCount) {
    const legendItems = document.querySelectorAll('.legend-item span');
    legendItems.forEach(item => {
        if (item.textContent.includes('Active Buses')) {
            item.textContent = `Active Buses (${activeCount})`;
        }
    });
}

// Update live indicator
function updateLiveIndicator() {
    const indicator = document.querySelector('.live-indicator i');
    if (indicator) {
        indicator.style.opacity = indicator.style.opacity === '0.5' ? '1' : '0.5';
    }
}

// Initialize interactive elements
function initializeInteractions() {
    // Add click handlers for navigation items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
            // Add active class to clicked item
            this.classList.add('active');
        });
    });

    // Add click handlers for quick action buttons
    document.querySelectorAll('.action-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.querySelector('span').textContent;
            showNotification(`${action} clicked - Feature coming soon!`);
        });
    });

    // Add click handlers for alert cards
    document.querySelectorAll('.alert-card').forEach(card => {
        card.addEventListener('click', function() {
            this.style.opacity = '0.7';
            setTimeout(() => {
                this.style.opacity = '1';
            }, 200);
            showNotification('Alert details would open here');
        });
    });

    // Add click handlers for maintenance items
    document.querySelectorAll('.maintenance-item .btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const action = this.textContent;
            showNotification(`${action} action initiated`);
        });
    });

    // Add click handlers for driver status badges
    document.querySelectorAll('.driver-status').forEach(status => {
        status.addEventListener('click', function() {
            const driverName = this.parentElement.querySelector('h4').textContent;
            showNotification(`Driver ${driverName} details would open here`);
        });
    });

    // Add search functionality
    const searchInput = document.querySelector('.search-bar input');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const searchTerm = this.value.trim();
                if (searchTerm) {
                    showNotification(`Searching for: ${searchTerm}`);
                    // Here you would implement actual search functionality
                }
            }
        });
    }

    // Add map control functionality
    document.querySelectorAll('.map-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const icon = this.querySelector('i').classList;
            if (icon.contains('fa-plus')) {
                map.zoomIn();
            } else if (icon.contains('fa-minus')) {
                map.zoomOut();
            } else if (icon.contains('fa-crosshairs')) {
                map.setView([40.7128, -74.0060], 11);
            }
        });
    });

    // Add progress bar animations on load
    setTimeout(() => {
        document.querySelectorAll('.progress-fill, .efficiency-fill').forEach(fill => {
            fill.style.transition = 'width 1s ease-in-out';
        });
    }, 500);
}

// Show notification (simple toast-like notification)
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification-toast';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #1e293b;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        z-index: 10000;
        opacity: 0;
        transform: translateX(100px);
        transition: all 0.3s ease;
        max-width: 300px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Utility function to capitalize first letter
function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Handle window resize for responsive charts
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        if (performanceChart) {
            performanceChart.update('none');
        }
        if (driverChart) {
            driverChart.update('none');
        }
        if (map) {
            map.invalidateSize();
        }
    }, 100);
});

// Add some sample data loading simulation
function simulateDataLoading() {
    const sections = document.querySelectorAll('.dashboard-section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            section.style.transition = 'all 0.5s ease';
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Initialize loading animation when page loads
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(simulateDataLoading, 500);
});

// Export functions for potential external use
window.BusTrackerDashboard = {
    updateMetricValue,
    showNotification,
    initializeMap,
    initializeCharts
};
