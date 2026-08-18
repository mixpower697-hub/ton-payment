const tonConnectUI = new TON_CONNECT_UI.TonConnectUI({
    manifestUrl: window.location.origin + "/tonconnect-manifest.json",
    buttonRootId: "ton-connect"
});

// عنوان محفظتك
const walletAddress = "UQD0N_u4lRmmPiLLQdCZFduiiAub7Oh6ftWzIn7D88sumQ_9";

// حساب عدد CATI
const amountInput = document.getElementById("amount");
const tokensLabel = document.getElementById("tokens");

amountInput.addEventListener("input", () => {

    const gram = parseFloat(amountInput.value) || 0;

    const cati = (gram / 50) * 6000000;

    tokensLabel.innerText = cati.toLocaleString() + " CATI";

});

// زر الشراء
document.getElementById("buyBtn").addEventListener("click", async () => {

    const gram = parseFloat(amountInput.value);

    if (!gram || gram <= 0) {
        alert("Please enter a valid GRAM amount.");
        return;
    }

    // التحويل إلى nanotons
    const nanoAmount = (gram * 1000000000).toString();

    try {

        await tonConnectUI.sendTransaction({
            validUntil: Math.floor(Date.now() / 1000) + 600,
            messages: [
                {
                    address: walletAddress,
                    amount: nanoAmount
                }
            ]
        });

        alert("Transaction request sent to your wallet.");

    } catch (err) {

        console.error(err);
        alert("Transaction was cancelled or failed.");

    }

});
