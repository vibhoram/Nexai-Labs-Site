// ===================================
// CUSTOM DATE PICKER COMPONENT
// Premium Glassmorphism Calendar
// ===================================

class DatePicker {
    constructor(inputElement) {
        this.input = inputElement;
        this.selectedDate = null;
        this.currentMonth = new Date().getMonth();
        this.currentYear = new Date().getFullYear();
        this.isOpen = false;
        
        this.init();
    }
    
    init() {
        // Create wrapper
        const wrapper = document.createElement('div');
        wrapper.className = 'date-picker-wrapper';
        this.input.parentNode.insertBefore(wrapper, this.input);
        
        // Create display input
        this.display = document.createElement('div');
        this.display.className = 'date-input-display';
        this.display.innerHTML = `
            <span class="date-display-text">Select a date</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
        `;
        
        // Create calendar dropdown
        this.calendar = document.createElement('div');
        this.calendar.className = 'calendar-dropdown';
        
        // Hide original input
        this.input.style.display = 'none';
        
        // Append elements
        wrapper.appendChild(this.display);
        wrapper.appendChild(this.calendar);
        wrapper.appendChild(this.input);
        
        // Bind events
        this.display.addEventListener('click', () => this.toggle());
        document.addEventListener('click', (e) => this.handleOutsideClick(e));
        
        // Render calendar
        this.render();
    }
    
    toggle() {
        this.isOpen = !this.isOpen;
        this.calendar.classList.toggle('active', this.isOpen);
        this.display.classList.toggle('active', this.isOpen);
    }
    
    close() {
        this.isOpen = false;
        this.calendar.classList.remove('active');
        this.display.classList.remove('active');
    }
    
    handleOutsideClick(e) {
        if (!this.calendar.contains(e.target) && !this.display.contains(e.target)) {
            this.close();
        }
    }
    
    render() {
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                           'July', 'August', 'September', 'October', 'November', 'December'];
        
        const firstDay = new Date(this.currentYear, this.currentMonth, 1).getDay();
        const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
        const today = new Date();
        
        this.calendar.innerHTML = `
            <div class="calendar-header">
                <button class="calendar-nav-btn" data-action="prev">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                </button>
                <h4>${monthNames[this.currentMonth]} ${this.currentYear}</h4>
                <button class="calendar-nav-btn" data-action="next">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                </button>
            </div>
            
            <div class="calendar-weekdays">
                <div class="calendar-weekday">Su</div>
                <div class="calendar-weekday">Mo</div>
                <div class="calendar-weekday">Tu</div>
                <div class="calendar-weekday">We</div>
                <div class="calendar-weekday">Th</div>
                <div class="calendar-weekday">Fr</div>
                <div class="calendar-weekday">Sa</div>
            </div>
            
            <div class="calendar-days"></div>
            
            <div class="calendar-footer">
                <button class="calendar-footer-btn" data-action="clear">Clear</button>
                <button class="calendar-footer-btn" data-action="today">Today</button>
            </div>
        `;
        
        const daysContainer = this.calendar.querySelector('.calendar-days');
        
        // Empty cells before month starts
        for (let i = 0; i < firstDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day disabled';
            daysContainer.appendChild(emptyDay);
        }
        
        // Days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayButton = document.createElement('button');
            dayButton.className = 'calendar-day';
            dayButton.textContent = day;
            dayButton.dataset.day = day;
            
            // Check if today
            if (day === today.getDate() && 
                this.currentMonth === today.getMonth() && 
                this.currentYear === today.getFullYear()) {
                dayButton.classList.add('today');
            }
            
            // Check if selected
            if (this.selectedDate && 
                day === this.selectedDate.getDate() && 
                this.currentMonth === this.selectedDate.getMonth() && 
                this.currentYear === this.selectedDate.getFullYear()) {
                dayButton.classList.add('selected');
            }
            
            dayButton.addEventListener('click', () => this.selectDate(day));
            daysContainer.appendChild(dayButton);
        }
        
        // Bind navigation
        this.calendar.querySelector('[data-action="prev"]').addEventListener('click', () => this.prevMonth());
        this.calendar.querySelector('[data-action="next"]').addEventListener('click', () => this.nextMonth());
        this.calendar.querySelector('[data-action="clear"]').addEventListener('click', () => this.clearDate());
        this.calendar.querySelector('[data-action="today"]').addEventListener('click', () => this.selectToday());
    }
    
    selectDate(day) {
        this.selectedDate = new Date(this.currentYear, this.currentMonth, day);
        const formatted = this.formatDate(this.selectedDate);
        
        // Update display
        this.display.querySelector('.date-display-text').textContent = formatted;
        
        // Update hidden input
        this.input.value = this.selectedDate.toISOString().split('T')[0];
        
        // Close calendar
        setTimeout(() => this.close(), 200);
        
        // Re-render to show selection
        this.render();
    }
    
    selectToday() {
        const today = new Date();
        this.currentMonth = today.getMonth();
        this.currentYear = today.getFullYear();
        this.selectDate(today.getDate());
    }
    
    clearDate() {
        this.selectedDate = null;
        this.display.querySelector('.date-display-text').textContent = 'Select a date';
        this.input.value = '';
        this.render();
    }
    
    prevMonth() {
        this.currentMonth--;
        if (this.currentMonth < 0) {
            this.currentMonth = 11;
            this.currentYear--;
        }
        this.render();
    }
    
    nextMonth() {
        this.currentMonth++;
        if (this.currentMonth > 11) {
            this.currentMonth = 0;
            this.currentYear++;
        }
        this.render();
    }
    
    formatDate(date) {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                       'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    }
}

// Initialize all date pickers
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('input[type="date"].custom-datepicker').forEach(input => {
        new DatePicker(input);
    });
});
