/// <reference types="cypress"/>
import loginPage from '../support/pages/login'
import dashPage from '../support/pages/dash'
import { customer, provider, appointment } from '../support/factories/dash'

describe('Dashboard', () => {
    it('Deve exibir o agendamento feito por um cliente no dashboard', () => {
        cy.postUser(customer)
        cy.postUser(provider)

        cy.apiLogin(customer)
        cy.setProviderId(provider.email)
        cy.createAppointment(appointment.hour).then(() => {
            loginPage.go()
            loginPage.form(provider)
            loginPage.submit()
    
            dashPage.calendarShouldBeVisible()
            dashPage.selectDay(Cypress.env('appointmentDay'))
            dashPage.appointmentShouldBe(customer, appointment.hour)
        })
    })
})