<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class WebhookController extends Controller
{
    public function handleWebhook(Request $request)
    {
        $data = $request->all();

        if ($data['status'] === 'PAID') {
            // Update your order status in the database
        }

        return response()->json(['message' => 'Webhook received']);
    }
}
