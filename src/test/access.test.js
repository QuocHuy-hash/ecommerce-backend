'use strict';

const {
    login,
    AccessService,
    logout,
    handleRefreshToken
} = require('../services/access.service'); 
// Mock data for testing
const mockShop = {
    email: 'huy123@gmail.com',
    password: '123456',
    firstName: 'Quoc',
    lastName: 'Huy',
    role: '["ADMIN", "SHOP"]'
};


describe('Authentication and Access Service', () => {
    describe('Login Function', () => {
        it('should successfully login a user', async () => {
            const { shop, tokens } = await login({
                email: mockShop.email,
                password: mockShop.password
            });
            expect(shop).toBeDefined();
            expect(tokens).toBeDefined();
        });

    });
    // describe('register Function', () => {
    //     it('should register a user', async () => {
    //         const { shop, tokens } = await AccessService({
    //             email: 'huyhqpk0263811@fpt.edu.vn',
    //             password: mockShop.password,
    //             firstName: mockShop.firstName,
    //             lastName: mockShop.lastName,
    //             role: mockShop.role,
    //         });
    //         expect(shop).toBeDefined();
    //         expect(tokens).toBeDefined();
    //     });

    // });
    describe('Logout Function', () => {
        it('should successfully logout a user', async () => {
            const mockKeyStore = { id: '1' };
            const result = await logout(mockKeyStore);
            expect(result).toBeDefined();
        });
    });
    describe('Handle Refresh Token Function', () => {
        it('should throw an error for an invalid refresh token', async () => {
            const invalidToken = 'invalid-refresh-token';
            await expect(handleRefreshToken(invalidToken)).rejects.toThrow('Shop not registed');
        });
    });
});

