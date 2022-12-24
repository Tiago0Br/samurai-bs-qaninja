import header from '../../components/header'
import { el } from './elements'

class DashPage {
    constructor() {
        this.header = header
    }

    calendarShouldBeVisible() {
        cy.get(el.calendar, { timeout: 7000 }).should('be.visible')
    }

    selectDay(day) {
        if (day === 1) {
            cy.get('span[class*=next]').click()
        }

        const target = new RegExp(`^${day}$`, 'g')
        cy.contains(el.availableDays, target).click()
    }

    appointmentShouldBe(customer, hour) {
        cy.contains('div', customer.name)
            .should('be.visible')
            .parent()
            .contains(el.appointmentHour, hour)
            .should('be.visible')
    }
}

export default new DashPage()