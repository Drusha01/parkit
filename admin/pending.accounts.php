<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pending Page</title>

    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <link href="./vendor/font-awesome-4.7.0/css/font-awesome.min.css" />
    <link href="./vendor/dataTable-1.13.6/datatables.min.css" rel="stylesheet">
    <!-- js whatever -->
    <?php
    require_once('./scripts/script.php');    
    
    ?>
    <!-- Chart.js -->
    <script defer src="https://cdn.jsdelivr.net/npm/chart.js"></script>

    <!-- Custom CSS -->
    <link rel="stylesheet" href="style.css">
</head>

<body style="overflow: hidden;">
    <!-- Navigation Bar -->
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top" style="background-color: #06283D;">
        <a class="navbar-brand ms-4" href="#">
            <img src="logo1.png" alt="logo" width="60" height="30">
        </a>
    </nav>

    <!-- Page Content -->
    <div class="container-fluid">
        <div class="row">
            <!-- Sidebar -->
            <nav id="sidebar" class="col-md-3 col-lg-2 d-md-block bg-light sidebar">
                <div class="position-sticky">
                    <ul class="nav flex-column">
                        <li class="nav-item">
                            <a class="nav-link" href="dashboard.html">
                                <img src="dashboard.png" alt="dashboard" width="20" height="20" class="mr-2">
                                Dashboard
                            </a>
                        </li>
                        <li class="nav-item active">
                            <a class="nav-link" href="user.html">
                                <img src="user.png" alt="users" width="20" height="20" class="mr-2">
                                Users
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="reports.html">
                                <img src="report.png" alt="report" width="20" height="20" class="mr-2">
                                Reports
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="staff.html">
                                <img src="staff.png" alt="staff" width="20" height="20" class="mr-2">
                                Staff
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="setting.html">
                                <img src="setting.png" alt="setting" width="20" height="20" class="mr-2">
                                Setting
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="wallet.html">
                                <img src="wallet.png" alt="wallet" width="20" height="20" class="mr-2">
                                Wallet
                            </a>
                        </li>
                        <div class="dropdown-divider"></div>
                        <li class="nav-item">
                            <a class="nav-link" href="login.html">
                                <img src="logout.png" alt="logout" width="20" height="20" class="mr-2">
                                Log Out
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>

            <!-- Main Content -->
            <main class="col-md-9 ms-sm-auto col-lg-10 px-md-6" style="padding-top: 40px;">
                <div class="d-flex ms-5 mt-4">
                    <h4 class="h3 m">Pending Account</h1>
                </div>
                <div class="d-flex ms-5 mt-4" id="MyButtons" class="d-flex mb-md-2 mb-lg-0 col-12 col-md-auto">ContentPDF</div>


                <!-- Overview Content Goes Here -->


            </main>
        </div>
    </div>

    <!-- Include Bootstrap JS and jQuery -->
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.3/dist/umd/popper.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <script src="/js/pending.js"></script>


</body>

</html>