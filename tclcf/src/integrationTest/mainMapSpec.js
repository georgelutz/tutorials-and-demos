/* eslint-disable */
describe('main map page', () => {
    describe('standalone', () => {
        it('should use the port provided in the querystring', () => {
            let expectedPort = 12345
            let url = `http://localhost:9000/#/nav/main-map?port=${expectedPort}`
            browser.get(url)

            browser.wait(() => {
                return element(by.id('port')).getAttribute('value').then(text => {
                    if(text)
                        return true
                    else
                        return false
                })
            })

            expect(element(by.id('port')).getAttribute('value')).toEqual(expectedPort.toString())
        }, 10000)
    })

    describe('embedded', () => {
        it('should use the port provided in the querystring', () => {
            let expectedPort = 12345
            let url = `http://localhost:9000/#/nav/main-map?port=${expectedPort}`
            browser.get(url)

            browser.wait(() => {
                return element(by.id('port')).getAttribute('value').then(text => {
                    if(text)
                        return true
                    else
                        return false
                })
            })

            expect(element(by.id('port')).getAttribute('value')).toEqual(expectedPort.toString())
        }, 10000)
    })
})
