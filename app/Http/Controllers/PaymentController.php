<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Xendit\Xendit;
class PaymentController extends Controller
{
    public function createInvoice()
    {
        Xendit::setApiKey(config('xendit.secret_key'));

        $params = [
            'external_id' => 'invoice-' . time(),
            'payer_email' => 'customer@example.com',
            'description' => 'Order Payment',
            'amount' => 50000, // Amount in IDR
        ];

        try {
            $invoice = \Xendit\Invoice::create($params);
            return response()->json($invoice);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
