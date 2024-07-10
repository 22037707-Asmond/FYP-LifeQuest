const Paypal = () => {

    var cartTotal = document.getElementById("cartTotal").value;
    console.log("Cart Total: " + cartTotal);

    paypal.Buttons({
        createOrder : function(data, actions) {
            // This function sets up the details of the transaction, 
            // including the amount and line item details.
            return actions.order.create({
                purchase_units : [ {
                    amount : {
                        value : cartTotal
                    }
                } ]
            });
        },
        onApprove : function(data, actions) {
            // This function captures the funds from the transaction.
            return actions.order.capture().then(function(details) {
                
                //Extracting some information from details
                var orderId = details.id;
                var transactionId = details.purchase_units[0].payments.captures[0].id;
                var completedBy = details.payer.name.given_name;
    
                //Printing to the console some details
                console.log('Transaction completed by ' + completedBy);
                console.log("Order ID: " + orderId);
                console.log("Transaction ID: " + transactionId);
                
                //Printing full details JSON
                console.log(JSON.stringify(details));
                
                //Calling processOrder function
                processOrder(orderId, transactionId);
            });
        }
    }).render('#paypal-button-container');

    function processOrder(orderId, transactionId) {
        
        //Set orderId and transactionId into the hidden values in the paypalForm
        document.getElementById("orderId").value = orderId;
        document.getElementById("transactionId").value = transactionId;
        
        //Submit the paypalForm to be processed at the backend
        document.getElementById("paypalForm").submit();
        console.log("Processing Order in backend: " + orderId);
        
    }

    return(
        <div class="row m-3 border-bottom fw-bold">
            <div id="paypal-button-container"></div>
            <form th:action="@{/topUp/process_order}" method="post" id="paypalForm">
                <input type="hidden" name="cartTotal" id="cartTotal" th:value="${total}"/>
                <input type="hidden" name="memberId" id ="memberId" th:value="${memberId}"/>
                <input type="hidden" name="orderId" id="orderId"/>
                <input type="hidden" name="transactionId" id="transactionId"/>
            </form>
        </div>
    )
};

export default Paypal;