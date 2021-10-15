class GeneralController {

    handleError(res, error) {
        res.status(500).send(error.message)
    };

}

export default GeneralController;