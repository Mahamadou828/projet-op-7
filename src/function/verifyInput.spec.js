import VerifyInput from "./verifyInput" ; 

describe("Verify Input of a form", () => {
    describe("Verify email addresse" , () => {
        it ("return true with addresse email@gmail.com" , () => {
            expect(VerifyInput("email@gmail.com" , 2).result).toEqual(true) ; 
        }) ; 
        it ("return false with addresse 12212-mama" , () => {
            expect(VerifyInput("12212-mama" , 2).result).toEqual(false) ; 
        }) ; 
    }) ; 

    describe("Verify name input" , () => {
        it ("return true with name Conde" , () => {
            expect(VerifyInput("Conde" , 1).result).toEqual(true) ; 
        }) ; 
        it ("return false with name 1221Ms" , () => {
            expect(VerifyInput("1221Ms" , 1).result).toEqual(false)
        })
    }) ; 

    describe("Verify img" , () => {
        it("return true with file name img.jpg and size 700000" , () => {
            const obj = {
                name: "img.jpg" , 
                size: 700000
            }
            expect(VerifyInput(obj , 3).result).toEqual(true) ; 
        }) ; 

        it("return false with file name img.gif and size 7000000" , () => {
            const obj = {
                name: "img.gif" , 
                size: 7000000
            }
            expect(VerifyInput(obj , 3).result).toEqual(false) ; 
        }) ;
    }) ; 

    describe("verify long text" , () => {
        it("return true" , () => {
            const text = "Un petit text sans interet. J'ai beaucoup d'idee chelou.";
            expect(VerifyInput(text , 4).result).toEqual(true) ; 
        }) ; 

        it("return false" , () => {
            const text = "un / texte <illegal>" ; 
            expect(VerifyInput(text , 4).result).toEqual(false) ; 
        })
    })
}) ; 