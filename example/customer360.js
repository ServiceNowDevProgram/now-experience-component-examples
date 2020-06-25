import '../src/customer-360-example';

const el = document.createElement('DIV');
document.body.appendChild(el);

el.innerHTML = `		
    <div style="height: 200px; padding: 10px; background-color: #ddd">
        <example-customer-360 table="incident" sysid="85071a1347c12200e0ef563dbb9a71c1"></example-customer-360>
    </div>
`;
