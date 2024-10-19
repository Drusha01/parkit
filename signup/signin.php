<!DOCTYPE html>
<html lang="en">
<?php
    $title = 'Sign In';
    $dashboard_page = 'active';
    require_once('./include/head.php');
?>
<body style="height: 100vh; width: 100vw; display: flex; justify-content:center; align-items:center;">
    <div>
        <div class="text-center"><img src="../img/logobluee.png" height="100" width="100" alt=""></div>
        <div class="text-center">Sign Up to your account</div><br>
        <form action="">
            <div style="font-size: 12px;">
                <label for="username" class="form-label">Username</label>
                <input type="text" class="form-control" id="username" name="username" placeholder="Enter username" style="font-size: 10px;">
            </div>
            <div style="font-size: 12px;">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" name="password" placeholder="Enter password" style="font-size: 10px;">
            </div>
            <div><a href="#" style="color: black; text-decoration: none; font-size: 8px;">Forgot password?</a></div>
            <button style="background-color: #1363DF;color: White; font-size: 12px; border: none; border-radius: 3px; margin-bottom: 3px; padding: 3px 0; text-align: center; width: 200px;" type="submit">Sign in</button>
            <div><button style="background-color: #E8E8E8; color: grey; font-size: 12px; border: none; border-radius: 3px; padding: 3px 0; text-align: center; width: 200px;" type="submit"><a href="signupas.php" style="text-decoration: none; color: grey;">Create Account</a></button></div>
        </form>
        <br><div class="text-center" style="font-size: 12px;">Or sign in with</div><br>
        <div class="text-center" style="font-size: 12px; border: 0.1px groove; padding: 3px; margin-bottom: 10px;"><img src="../img/googleicon.jpg" height="25" width="25" alt=""> Sign in with google</div>
        <div class="text-center" style="font-size: 12px; border: 0.1px groove; padding: 3px;"><img src="../img/fbicon.png" height="25" width="25" alt=""> Sign in with Facebook</div>
    </div>
</body>
</html>