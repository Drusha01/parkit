<!DOCTYPE html>
<html>
<head>
    <!-- not nice - ace dev - https://github.com/Drusha01 -->
    <meta charset="utf-8">
    <title>Email Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }

        .container {
            max-width: 600px;
            margin: 60px auto;
            padding: 20px;
            background-color: #ffffff;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            border-radius: 5px;
        }

        .header {
            text-align: center;
            margin-bottom: 20px;
        }

        .logo img {
            max-width: 150px;
        }

        h1 {
            color: #333;
            font-size: 24px;
            margin-bottom: 10px;
        }

        p {
            font-size: 16px;
            line-height: 1.6;
            margin-bottom: 10px;
        }

        .verification-code {
            text-align: center;
            font-size: 32px;
            font-weight: bold;
            color: black;
            margin-top: 20px;
        }

        .footer {
            text-align: center;
            margin-top: 20px;
            color: #777;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">
            </div>
            <h1>ParkIt</h1>
        </div>

        <p>Dear {{$email}},</p>

        <p>Thank you for registering with ParkIt.</p>

        <p>Your verification code is:</p>
        <p class="verification-code">{{$code}}</p> <!-- Replace with your verification code -->

        <p>Please enter this code on our website to complete the verification process.</p>

        <p>If you did not request this verification code, please ignore this email.</p>

        <div class="footer">
            <p>Best Regards,</p>
            <p>ParkIt</p>
        </div>
    </div>
</body>
</html>
