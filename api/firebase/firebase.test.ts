import FirebaseService from './Firebase'

describe('Firebase', () => {
    let firebaseClient:any = null
    
    beforeAll(() => {
        firebaseClient = FirebaseService;
    })
    
    it('Firebase should start successfully', async () => {
        
        const result = await firebaseClient.fire_base_starter();
        expect(result).toBe(true)
    })
});