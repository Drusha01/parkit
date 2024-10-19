<nav class="navbar navbar-expand-lg navbar-dark fixed-top" style="background-color: #06283D;">
        <a class="navbar-brand ms-4" href="#">
            <img src="/admin/images/logo1.png" alt="" style="width: 60px; height: 30px;">
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
                            <a class="nav-link <?= $index_page ?>"  aria-current="page" href="index.php">
                                <img src="/admin/images/dashboard.png" alt="dashboard" width="20" height="20" class="mr-2">
                                Dashboard
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link <?= $user_page ?>" href="users.php">
                                <img src="/admin/images/user.png" alt="users" width="20" height="20" class="mr-2">
                                Users
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link <?= $report_page?>" href="reports.php">
                                <img src="/admin/images/report.png" alt="report" width="20" height="20" class="mr-2">
                                Reports
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link <?= $staff_page?>" href="staff.php">
                                <img src="/admin/images/staff.png" alt="staff" width="20" height="20" class="mr-2">
                                Staff
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link <?= $setting_page?>" href="setting.php">
                                <img src="/admin/images/setting.png" alt="setting" width="20" height="20" class="mr-2">
                                Setting
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link <?= $wallet_page?>" href="wallet.php">
                                <img src="/admin/images/wallet.png" alt="wallet" width="20" height="20" class="mr-2">
                                Wallet
                            </a>
                        </li>
                        <div class="dropdown-divider"></div>
                        <li class="nav-item">
                            <a class="nav-link" href="login.php">
                                <img src="/admin/images/logout.png" alt="logout" width="20" height="20" class="mr-2">
                                Log Out
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    </div>