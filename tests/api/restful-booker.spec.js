// tests/api/restful-booker.spec.js
// Booking lifecycle on Restful-Booker: each request uses data from the previous one.
const { test, expect } = require('@playwright/test');


const BASE_URL = 'https://restful-booker.herokuapp.com';

const HEADERS = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
};

const bookingData = {
    firstname: 'Test',
    lastname: 'Automation',
    totalprice: 150,
    depositpaid: true,
    bookingdates: {
        checkin: '2026-12-01',
        checkout: '2026-12-05'
    },
    additionalneeds: 'Breakfast'
};

const updatedCheckout = '2026-12-10';

// Shared state passed between the chained tests
let token;
let bookingId;

test.describe.serial('Restful-Booker - Booking lifecycle', () => {

    // 1. Authentication
    test('1. Generate auth token', async ({ request }) => {

        const response = await request.post(`${BASE_URL}/auth`, {
            headers: HEADERS,
            data: {
                username: 'admin',
                password: 'password123'
            }
        });

        expect(response.status()).toBe(200);

        const body = await response.json();
        console.log(body);

        expect(body.token).toBeDefined();
        token = body.token;
    });

    // 2. Create Booking
    test('2. Create booking', async ({ request }) => {

        const response = await request.post(`${BASE_URL}/booking`, {
            headers: HEADERS,
            data: bookingData
        });

        expect(response.status()).toBe(200);

        const body = await response.json();
        console.log(body);

        expect(body.bookingid).toBeDefined();
        bookingId = body.bookingid;
    });

    // 3. Read Booking
    test('3. Read booking by ID', async ({ request }) => {

        const response = await request.get(`${BASE_URL}/booking/${bookingId}`, {
            headers: HEADERS
        });

        expect(response.status()).toBe(200);

        const body = await response.json();
        console.log(body);

        expect(body).toEqual(bookingData);
    });

    // 4. Update Booking
    test('4. Update booking checkout date', async ({ request }) => {

        const updatedBooking = {
            ...bookingData,
            bookingdates: {
                ...bookingData.bookingdates,
                checkout: updatedCheckout
            }
        };

        const response = await request.put(`${BASE_URL}/booking/${bookingId}`, {
            headers: {
                ...HEADERS,
                Cookie: `token=${token}`
            },
            data: updatedBooking
        });

        expect(response.status()).toBe(200);

        const body = await response.json();
        console.log(body);

        expect(body.bookingdates.checkout).toBe(updatedCheckout);
        expect(body).toEqual(updatedBooking);
    });

    // 5. Delete Booking
    test('5. Delete booking and confirm it no longer exists', async ({ request }) => {

        const response = await request.delete(`${BASE_URL}/booking/${bookingId}`, {
            headers: {
                ...HEADERS,
                Cookie: `token=${token}`
            }
        });

        expect(response.status()).toBe(201);

        const getResponse = await request.get(`${BASE_URL}/booking/${bookingId}`, {
            headers: HEADERS
        });

        expect(getResponse.status()).toBe(404);
    });

});
