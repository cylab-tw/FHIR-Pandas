const template = (function () {
    let loadingSpinners = `<h3 class="text-center align-items-center d-inline">Loading...</h3><div class="spinner-border ms-2" role="status" aria-hidden="true"></div>`
    let info = `<div class='py-5'>
                <div class="d-inline-block text-center mb-3">
                    <img src="../img/RedPanda.jpg" class="rounded me-1" style="width: 4rem;">
                    <h1 class="text-danger fw-bold d-inline align-bottom">RedPanda</h1>
                    <p class="lead mt-2">
                        - A HL7 FHIR consumer -
                    </p>
                    <button class='btn btn-secondary text-capitalize mb-3' onclick='exampleSearch()'>demo</button><br/>
                    <span>or</span>
                    <div class="list-group list-group-small list-group-light list-group-numbered">
                        <button type="button" class="list-group-item list-group-item-action bg-light" onclick="document.getElementById('settingBtns-tab-1').click()">
                            Set your search setting
                        </button>
                        <button type="button" class="list-group-item list-group-item-action bg-light" onclick="document.getElementById('settingBtns-tab-2').click()">
                        Set your display setting
                        </button>
                        <button type="button" class="list-group-item list-group-item-action bg-light" onclick="document.getElementById('searchBtn').click()">
                            Start search
                        </button>
                    </div>                    
                </div>
                <h3 class="text-center">
                    View more：
                    <a class='text-danger' href="https://hl7.org/fhir/" target="_blank">
                        HL7 FHIR<i class="fab fa-gripfire ms-2 text-danger"></i>
                    </a>
                </h3>
                <h3 class="text-center">
                    Github：
                    <a class='text-primary' href="https://github.com/cylab-tw/Redpanda-FHIR" target="_blank">
                        Redpanda-FHIR<i class="fab fa-github ms-2"></i>
                    </a>
                </h3>
                <h3 class="text-center">
                    Contact us：
                    <a class="" href="https://cylab.dicom.tw/" target="_blank">
                        <img class='bg-dark' src="../img/cylab-logo.png" style="width: 15rem;">
                    </a>
                </h3>
            </div>`
    return {
        loadingSpinners,
        info
    }
})()

export default template