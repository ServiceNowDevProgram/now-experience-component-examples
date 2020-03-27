import '../src/now-sample-customer-360';
import '../src/now-sample-todo-list';

const el = document.createElement('DIV');
document.body.appendChild(el);

el.innerHTML = `		
    <now-sample-customer-360 table="incident" sysid="d71f7935c0a8016700802b64c67c11c6"></now-sample-customer-360>

    <br/>

    <now-sample-todo-list />
`;
