<!DOCTYPE html>
<html lang="en">

<?php
    $title = 'Users';
    $users_page = 'active';
    require_once('./include/head.php');
?>

<body>
    <!-- Page Content -->
    <div class="container-fluid">
        <div class="row">
            <!-- Sidebar -->
            <?php
            require_once('./include/sidebar.php');
            ?>
    <style>
        tr[data-href] {
            cursor: pointer;
        }
    </style>
    
            <!-- Main Content -->
            <main class="col-md-9 ms-sm-auto col-lg-10 px-md-6 d-flex justify-content-center align-items-center " style=" height: 82vh;">
                <div class="title">
                    <table class="table" style="width: 50vw;">
                        <thead>
                            <tr style="border-bottom: 2px solid #000000;">
                                <th>
                                    <h3 style="font-weight: bold; padding-left: 2rem;">Account</h3>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style="border-bottom: 2px solid #000000;" data-href="http://www.google.com/">
                                <td style="padding-left: 3em; width: 5em;"><i class="fa fa-user" aria-hidden="true" style="font-size: 1.5rem;"></i></td>
                                <td>Pending Accounts</td>
                                <td><i class="fa fa-angle-right" aria-hidden="true" style="font-size: 1.5rem;"></i></td>
                            </tr>
                            <tr style="border-bottom: 2px solid #000000;" data-href="http://www.google.com/">
                                <td style="padding-left: 3em;"><i class="fa fa-user" aria-hidden="true" style="font-size: 1.5rem;"></i></td>
                                <td>List of Users Account</td>
                                <td><i class="fa fa-angle-right" aria-hidden="true" style="font-size: 1.5rem;"></i></td>
                            </tr>
                            <tr style="border-bottom: 2px solid #000000;" data-href="http://www.google.com/">
                                <td style="padding-left: 3em;"><i class="fa fa-user" aria-hidden="true" style="font-size: 1.5rem;"></i></td>
                                <td>Warning Accounts</td>
                                <td><i class="fa fa-angle-right" aria-hidden="true" style="font-size: 1.5rem;"></i></td>
                            </tr>
                            <tr style="border-bottom: 2px solid #000000;" data-href="http://www.google.com/">
                                <td style="padding-left: 3em;"><i class="fa fa-user" aria-hidden="true" style="font-size: 1.5rem;"></i></td>
                                <td>Banned Accounts</td>
                                <td><i class="fa fa-angle-right" aria-hidden="true" style="font-size: 1.5rem;"></i></td>
                            </tr>
                            <tr style="border-bottom: 2px solid #000000;" data-href="http://www.google.com/">
                                <td style="padding-left: 3em;"><i class="fa fa-user" aria-hidden="true" style="font-size: 1.5rem;"></i></i></td>
                                <td>Reported Accounts</td>
                                <td><i class="fa fa-angle-right" aria-hidden="true" style="font-size: 1.5rem;"></i></td>
                            </tr>
                            <tr style="border-bottom: 2px solid #000000;" data-href="http://www.google.com/">
                                <td style="padding-left: 3em;"><i class="fa fa-user" aria-hidden="true" style="font-size: 1.5rem;"></i></i></td>
                                <td>Reported Incidents</td>
                                <td><i class="fa fa-angle-right" aria-hidden="true" style="font-size: 1.5rem;"></i></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </main>

        </div>
    </div>

    <!-- Include Bootstrap JS and jQuery -->
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.3/dist/umd/popper.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>

    <script>
        document.addEventListener("DOMContentLoaded", () => {
            const rows = document.querySelectorAll("tr[data-href]");

            rows.forEach(row => {
                row.addEventListener("click", () => {
                    window.location.href = row.dataset.href;
                });
            });
        });
    </script>


</body>

</html>