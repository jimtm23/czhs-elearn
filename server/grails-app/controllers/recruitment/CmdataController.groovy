package recruitment


import grails.rest.*
import grails.converters.*
import grails.transaction.Transactional

/** Controller that triggers loading of data for developer testing. */
@Transactional(readOnly = true)
class CmdataController {
	// static responseFormats = ['json', 'xml']
	
    /** Injected bean that loads data set up in the fixtures. */
    def fixtureLoader

    /** Redirects all requests to the action 'load'. */
    def index() {
        println "HAHAHAHAHAHAHAHAHA"
        println params
        redirect action: 'load', params: params
    }

    /** Triggers loading of data. */
    def load() {
        // fixtureLoader.load(params.target ?: "required")
        println 'INFO| Data loaded successfully.'
        render 'Data loaded successfully.'
    }
}

