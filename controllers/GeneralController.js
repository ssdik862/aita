
class GeneralController {
     
    handleError(res, error)  {
        return res.status(500).send(error.message);
    }

}

export default GeneralController;