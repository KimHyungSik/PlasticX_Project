/**
 * 
- ADMIN gives TUMBLERS to SHOP
- SHOP takes QR of all the TUMBLERS
    - a. get t_id, s_id and send to server,
        - how to get t_id?
            - each qr code contains url of the server according to its t_id
                - eg. [http://13.59.10.162/](http://13.59.10.162/web)0
                    - 
    - b. t_id, s_id is saved to DB from server
        - once url is opened, there should be a t_id (foreign key) created in the DB along with s_id
            - how to generate stuff into db
 */