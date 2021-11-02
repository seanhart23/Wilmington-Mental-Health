///// Patient Intake Options
console.log("Intake JS is loaded...")

$(function () {
    $('#type-of-service').on('change', function () {
        $('#tos').fadeOut(500);
        setTimeout(() => {
            $('#prof-disc').fadeIn(500);
        }, 600);
        var service = $('#type-of-service').find(":selected").text()
        if (service === "Intake Packet"){
            $('#service-forms').html(
                "<li><a href='https://hipaa.jotform.com/wmhnc/roi' target='_blank'>Intake Packet</a></li>"
            )
        } else if (service === "Authorization Form") {
            $('#service-forms').html(
                "<li><a href='https://hipaa.jotform.com/wmhnc/roi' target='_blank'>Authorization Form</a></li>"
            )
        } else if (service === "Ingreso del Paciente") {
            $('#service-forms').html(
                "<li><a href='https://hipaa.jotform.com/wmhnc/registracion' target='_blank'>Formularios de Ingreso</a></li>"
            )
        } else if (service === "Planilla de Autorización") {
            $('#service-forms').html(
                "<li><a href='https://hipaa.jotform.com/wmhnc/registracion' target='_blank'>Planilla de Autorización</a></li>"
            )
        } else if (service === "New Patient Health History Form") {
            $('#service-forms').html(
            )
        } else if (service === "Attention-Deficit/Hyperactivity") {
            $('#service-forms').html(
                "<li><a href='#' target='_blank'>Consent Form</a></li>" +
                "<li><a href='https://hipaa.jotform.com/wmhnc/scl-90r' target='_blank'>Symptom Checklist-90R</a></li>" +
                "<li><a href='#' target='_blank'>Adult ADHD Self-Report Scale</a></li>" +
                "<li><a href='#' target='_blank'>Driving Behavior Survey</a></li>" +
                "<li><a href='#' target='_blank'>Work Productivity and Activity Impairment</a></li>" +
                "<li><a href='#' target='_blank'>Wender Utah Rating Scale (WURS)</a></li>"
            )
        } else if (service === "Pre-Bariatric Surgery") {
            $('#service-forms').html(
                "<li><a href='https://hipaa.jotform.com/wmhnc/cpbs' target='_blank'>Consent Form</a></li>" +
                "<li><a href='https://hipaa.jotform.com/wmhnc/ede-q6' target='_blank'>Eating Disorder Examination Questionnaire (EDE-Q 6)</a></li>" +
                "<li><a href='https://hipaa.jotform.com/wmhnc/mhlc' target='_blank'>Multidimensional Health Locus Of Control (MHLC)</a></li>" +
                "<li><a href='https://hipaa.jotform.com/wmhnc/bdi' target='_blank'>Beck’s Depression Inventory (BDI-II)</a></li>" +
                "<li><a href='https://hipaa.jotform.com/wmhnc/qewp-5' target='_blank'>Questionnaire On Eating And Weight Pattern (QEWP-5)</a></li>" +
                "<li><a href='https://hipaa.jotform.com/wmhnc/scl-90r' target='_blank'>Symptom Checklist-90R</a></li>"
            )
        } else if (service === "Drug and Alcohol Abuse") {
            $('#service-forms').html(
                
            )
        } else if (service === "Immigration Assessment") {
            $('#service-forms').html(
                "<li><a href='#' target='_blank'>Consent Form</a></li>" +
                "<li><a href='#' target='_blank'>Beck’s Depression Inventory (BDI-II)</a></li>" +
                "<li><a href='#' target='_blank'>PTSD Checklist (PCL-5)</a></li>"
            )
        } else if (service === "Adult Sex Offender Recidivism") {
            $('#service-forms').html(
                
            )
        } else if (service === "Domestic Violence") {
            $('#service-forms').html(
                
            )
        } else if (service === "Anger Management") {
            $('#service-forms').html(
                
            )
        } else {

        }
    });

    $('#name-of-provider').on('change', function () {
        $('#prof-disc').fadeOut(400);
        setTimeout(() => {
            $('#intake-forms').fadeIn(500);
            $("html, body").animate({ scrollTop: $('#intake-forms').offset().top - 50 }, 0)
        }, 500);
    })

    $('#name-of-provider').on('change', function () {
        var provider = $('#name-of-provider').find(":selected").text()
        if (provider === 'Joseph Rengifo') {
            $('#provider-forms').html(
                "<li><a href='https://hipaa.jotform.com/wmhnc/pdsjr' target='_blank'>Joseph Rengifo - Professional Disclosure Statement</a></li>"
            ) 
        } else if (provider === 'Havah Henzler') {
            $('#provider-forms').html(
                "<li><a href='./images/havahpds.pdf' target='_blank'>Havah Hanzler - Professional Disclosure Statement</a></li>"
            )
        } else if (provider === 'Sarah Mooring') {
            $('#provider-forms').html(
                "<li><a href='./images/mooringdisc.pdf' target='_blank'>Sarah Mooring - Professional Disclosure Statement</a></li>"
            )
        } else if (provider === 'Lisa Blackmon') {
            $('#provider-forms').html(
                "<li><a href='https://hipaa.jotform.com/wmhnc/pdslr' target='_blank'>Lisa Blackmon - Professional Disclosure Statement</a></li>"
            )
        } else if (provider === 'Sarah Scott Ford') {
            $('#provider-forms').html(
                "<li><a href='https://hipaa.jotform.com/wmhnc/pdssf' target='_blank'>Sarah Scott Ford - Professional Disclosure Statement</a></li>"
            )
        } else if (provider === 'Joanne Lee') {
            $('#provider-forms').html(
                "<li><a href='#' target='_blank'>Joanne Lee - Professional Disclosure Statement</a></li>"
            )
        } else if (provider === 'Juliana Stanfield') {
            $('#provider-forms').html(
                "<li><a href='#' target='_blank'>Juliana Stanfield - Professional Disclosure Statement</a></li>"
            )
        } else if (provider === 'Yohanny Santana') {
            $('#provider-forms').html(
                "<li><a href='#' target='_blank'>Yohanny Santana - Professional Disclosure Statement</a></li>"
            )
        } else if (provider === 'Robert Siegel') {
            $('#provider-forms').html(
                "<li><a href='#' target='_blank'>Robert Siegel - Professional Disclosure Statement</a></li>"
            )
        } else if (provider === 'Beki Asti') {
            $('#provider-forms').html(
                "<li><a href='#' target='_blank'>Beki Asti - Professional Disclosure Statement</a></li>"
            )
        } else if (provider === 'Margaret Kaplan') {
            $('#provider-forms').html(
                "<li><a href='#' target='_blank'>Margaret Kaplan - Professional Disclosure Statement</a></li>"
            )
        }
    })
});

// var service      = $('#type-of-service').find(":selected").text()
// var registration = $('#type-of-registration').find(":selected").text()

// <li><a href='https://hipaa.jotform.com/wmhnc/intake-packet' target='_blank'>Intake Packet</a></li>
// <li><a href='https://hipaa.jotform.com/wmhnc/roi' target='_blank'>Authorization for Use or Disclosure of Protected Health Information</a></li>
// 