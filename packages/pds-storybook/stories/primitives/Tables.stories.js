import { html } from 'lit';

export default {
  title: 'Primitives/Tables',
  tags: ['table', 'data', 'grid', 'tabular', 'responsive'],
  parameters: {
    pds: {
      tags: ['table', 'data', 'grid', 'tabular', 'responsive', 'striped', 'bordered', 'compact']
    },
    docs: {
      description: {
        component: 'Responsive tables with various styling options including striped, bordered, and compact variants.'
      }
    }
  }
};

export const DefaultTable = () => html`
  <section class="card">
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Role</th>
          <th>Department</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Alice Johnson</td>
          <td>Senior Developer</td>
          <td>Engineering</td>
          <td><span class="badge badge-success">Active</span></td>
        </tr>
        <tr>
          <td>Bob Smith</td>
          <td>Product Manager</td>
          <td>Product</td>
          <td><span class="badge badge-success">Active</span></td>
        </tr>
        <tr>
          <td>Carol Williams</td>
          <td>UX Designer</td>
          <td>Design</td>
          <td><span class="badge badge-warning">Away</span></td>
        </tr>
        <tr>
          <td>David Brown</td>
          <td>DevOps Engineer</td>
          <td>Engineering</td>
          <td><span class="badge badge-danger">Offline</span></td>
        </tr>
      </tbody>
    </table>
  </section>
`;

DefaultTable.storyName = 'Default Table';

export const StripedTable = () => html`
  <section class="card">
    <table class="table-striped">
      <thead>
        <tr>
          <th>Product</th>
          <th>Price</th>
          <th>Stock</th>
          <th>Category</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Laptop Pro</td>
          <td>$1,299</td>
          <td>45</td>
          <td>Electronics</td>
        </tr>
        <tr>
          <td>Wireless Mouse</td>
          <td>$29</td>
          <td>128</td>
          <td>Accessories</td>
        </tr>
        <tr>
          <td>USB-C Hub</td>
          <td>$59</td>
          <td>76</td>
          <td>Accessories</td>
        </tr>
        <tr>
          <td>Monitor 27"</td>
          <td>$449</td>
          <td>23</td>
          <td>Electronics</td>
        </tr>
        <tr>
          <td>Mechanical Keyboard</td>
          <td>$149</td>
          <td>92</td>
          <td>Accessories</td>
        </tr>
      </tbody>
    </table>
  </section>
`;

StripedTable.storyName = 'Striped Table';

export const BorderedCompactTable = () => html`
  <section class="card">
    <table class="table-bordered table-compact">
      <thead>
        <tr>
          <th>ID</th>
          <th>Task</th>
          <th>Priority</th>
          <th>Due Date</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>#101</td>
          <td>Fix navigation bug</td>
          <td><span class="badge badge-danger">High</span></td>
          <td>Nov 15, 2025</td>
        </tr>
        <tr>
          <td>#102</td>
          <td>Update documentation</td>
          <td><span class="badge badge-warning">Medium</span></td>
          <td>Nov 18, 2025</td>
        </tr>
        <tr>
          <td>#103</td>
          <td>Refactor CSS</td>
          <td><span class="badge badge-info">Low</span></td>
          <td>Nov 25, 2025</td>
        </tr>
        <tr>
          <td>#104</td>
          <td>Add unit tests</td>
          <td><span class="badge badge-warning">Medium</span></td>
          <td>Nov 20, 2025</td>
        </tr>
        <tr>
          <td>#105</td>
          <td>Performance audit</td>
          <td><span class="badge badge-danger">High</span></td>
          <td>Nov 17, 2025</td>
        </tr>
      </tbody>
    </table>
  </section>
`;

BorderedCompactTable.storyName = 'Bordered Compact Table';

export const TableResponsiveWrapper = () => html`
  <div class="card">
    <h2>Responsive Table Wrapper</h2>
    <p class="text-muted">
      Wrap tables in <code>.table-responsive</code> for horizontal scrolling on mobile.
      This is the recommended approach for wide data tables.
    </p>
  </div>
  
  <div class="table-responsive">
    <table class="table-striped">
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Customer</th>
          <th>Product</th>
          <th>Quantity</th>
          <th>Unit Price</th>
          <th>Total</th>
          <th>Order Date</th>
          <th>Ship Date</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>#ORD-001</td>
          <td>John Doe</td>
          <td>Premium Widget Pro</td>
          <td>3</td>
          <td>$49.99</td>
          <td>$149.97</td>
          <td>Nov 15, 2025</td>
          <td>Nov 17, 2025</td>
          <td><span class="badge badge-success">Shipped</span></td>
          <td><button class="btn-sm btn-outline">View</button></td>
        </tr>
        <tr>
          <td>#ORD-002</td>
          <td>Jane Smith</td>
          <td>Standard Gadget</td>
          <td>1</td>
          <td>$29.99</td>
          <td>$29.99</td>
          <td>Nov 14, 2025</td>
          <td>—</td>
          <td><span class="badge badge-warning">Processing</span></td>
          <td><button class="btn-sm btn-outline">View</button></td>
        </tr>
        <tr>
          <td>#ORD-003</td>
          <td>Bob Johnson</td>
          <td>Deluxe Device XL</td>
          <td>2</td>
          <td>$99.99</td>
          <td>$199.98</td>
          <td>Nov 13, 2025</td>
          <td>Nov 14, 2025</td>
          <td><span class="badge badge-success">Delivered</span></td>
          <td><button class="btn-sm btn-outline">View</button></td>
        </tr>
      </tbody>
    </table>
  </div>
  
  <div class="card">
    <h3>How It Works</h3>
    <p>
      On screens smaller than the <code>sm</code> breakpoint (640px), the wrapper enables 
      horizontal scrolling with touch-friendly momentum scrolling. The table has a minimum 
      width (600px) to ensure content doesn't get too compressed.
    </p>
    <pre><code>&lt;div class="table-responsive"&gt;
  &lt;table&gt;
    ...
  &lt;/table&gt;
&lt;/div&gt;</code></pre>
  </div>
`;

TableResponsiveWrapper.storyName = 'Responsive Wrapper';

export const ResponsiveTable = () => html`
  <section class="card">
    <small class="text-muted">Resize the window to see horizontal scrolling on small screens</small>
    <div class="table-responsive">
      <table class="table-striped">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>#ORD-001</td>
            <td>John Doe</td>
            <td>Premium Widget</td>
            <td>3</td>
            <td>$49.99</td>
            <td>$149.97</td>
            <td>Nov 15, 2025</td>
            <td><span class="badge badge-success">Shipped</span></td>
          </tr>
          <tr>
            <td>#ORD-002</td>
            <td>Jane Smith</td>
            <td>Standard Gadget</td>
            <td>1</td>
            <td>$29.99</td>
            <td>$29.99</td>
            <td>Nov 14, 2025</td>
            <td><span class="badge badge-warning">Processing</span></td>
          </tr>
          <tr>
            <td>#ORD-003</td>
            <td>Bob Johnson</td>
            <td>Deluxe Device</td>
            <td>2</td>
            <td>$99.99</td>
            <td>$199.98</td>
            <td>Nov 13, 2025</td>
            <td><span class="badge badge-success">Delivered</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
`;

ResponsiveTable.storyName = 'Responsive Table';

export const TablesReference = () => html`
  <div class="card">
    <h2>Table Classes Reference</h2>
  
    <table class="table-bordered">
    <thead>
      <tr>
        <th>Class</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>table</code> (element)</td>
        <td>Base table styling with border-collapse and proper spacing</td>
      </tr>
      <tr>
        <td><code>.table-responsive</code></td>
        <td>Wrapper that enables horizontal scrolling on mobile</td>
      </tr>
      <tr>
        <td><code>.table-striped</code></td>
        <td>Alternating row background colors for readability</td>
      </tr>
      <tr>
        <td><code>.table-bordered</code></td>
        <td>Full borders around cells and table</td>
      </tr>
      <tr>
        <td><code>.table-compact</code></td>
        <td>Reduced cell padding for dense data display</td>
      </tr>
    </tbody>
  </table>
  </div>
`;

TablesReference.storyName = 'Reference';
